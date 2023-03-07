# Banking Application Capstone
Full three tiered banking demo

The current project can be found at https://badbank-app-uk8cl.ondigitalocean.app/#/ where it is packaged in a Docker container 
and deployed to Digital Ocean as a web app with persistent database running on the cloud. 

This assignment was to submit a fully deployed app however, the application can also be run locally for testing.
It is a three tiered banking application with a front end UI, a Data Abstraction Layer and a database storing client login and account info.

## Local RUN Instructions:
Download the files into a local folder and ensure you have both Node package manager and Docker installed.

at the commnad line cd into the folder run:
  > npm install

with docker running on your local machine build a new image for the backend with:
  >docker run --name badbank -d

from the local folder run:
  > node index.js

This runs the front end locally at port 8080 and will connect with the backend running in the container on port 27017.

## RoadMap: 
Further development is being worked on to add authentication managing security for users. Admin login will follow this and 
a transaction history component will be added to the users accounts. 

## LICENCE
MIT xPro
