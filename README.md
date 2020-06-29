# NODE.JS LEARNINGS
Learnings and sample applications on nodejs

## Useful libraries
* nodemon
  - Restart application as file changes
  - npm i nodemon -g or  ​​npm​​ ​​install​​ ​​--save​​ ​​--save-exact​​ ​​nodemon@1.11.0​
  - Placing below code in package.json which overrides default start  
      ` "scripts" : {
       "start" : "nodemon server.js" ,
       "test" :  "echo   \"  Error: no test specified  \"   && exit 1" 
       },`
   - restart with ` npm start`
   - 

* express-generator
  - Produces boilerplate code for an application
  - npm install express-generator -g
  - express <project_name>
