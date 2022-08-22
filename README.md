# service_script

This script will import services when provided with a CSV file containing the following columns:

- `type` - this value should always be `service`
- `name` - the desired name of the service.
- `description` - the description of the service.
- `auto_resolve_timeout`- time in seconds that an incident is automatically resolved if left open for that long. Value must not be negative. Setting this field to `0` or `null` will disable the feature.

This script will also create an escalation policy for each service. This escalation policy will consist of a single level containing the user whose ID is passed in.

## Input
This script can be run from the terminal using [NodeJs](https://nodejs.org/en/download/). 

The CSV file must be in the same directory as the script file. The following values must be included when running the script:
- KEY=Your_API_Key_Here
- USER=User_ID (This user is used in the escalation policy created for the service. The user ID can be found in the URL of a user's profile.)
- FILE=Your_CSV_File.csv

In terminal:

After navigating to the directory containing the script, run `npm install` to install required dependencies. The dependencies used in this script are:
- [axios](https://github.com/axios/axios)
- [csv-parse](https://github.com/adaltas/node-csv/tree/master/packages/csv-parse/)

Run `KEY=Your_API_Key_Here USER=PXXXXXX FILE=Your_CSV_File.csv node service_import.js` to execute the script.

