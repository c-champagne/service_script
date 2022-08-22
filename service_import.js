const fs = require("fs");
const {parse} = require("csv-parse");
const axios = require('axios');

const KEY = process.env.KEY; //API Key
const FILE = process.env.FILE; //CSV file name
const USER = process.env.USER; //User to be used for escalation policy creation

axios.defaults.headers.common['Authorization'] = 'Token token='+KEY;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/vnd.pagerduty+json;version=2';
const csv_data = [];

  async function creator(e) {
        try {
          const response = await axios.post('https://api.pagerduty.com/escalation_policies', {
            escalation_policy: {
                type: 'escalation_policy',
                name: e.name+"-ep",
                escalation_rules: [
                  {
                    escalation_delay_in_minutes: 30,
                    targets: [{id: USER, type: 'user_reference'}]
                  }
                ],
              }
          });
          const serviceResponse = await axios.post('https://api.pagerduty.com/services', {
            service: {
                type: e.type,
                name: e.name,
                description: e.description,
                auto_resolve_timeout: e.auto_resolve_timeout,
                escalation_policy: {id: response.data.escalation_policy.id, type: 'escalation_policy_reference'}
              }
          })
          console.log("Successfully created "+serviceResponse.data.service.name+" service with an ID of: "+serviceResponse.data.service.id)        }
         catch (error) {
          console.error(error);
        }
  } 

    fs.createReadStream(FILE)
    .pipe(parse({delimiter: ",", columns: true, ltrim: true}))
    .on("data", function (row){
        csv_data.push(row)
    })
    .on("error", function(error){
        console.log(error.message);
    })
    .on("end", function(){
        console.log("CSV File read");
          csv_data.forEach(e => {
            creator(e);  
        });  
    });   
 