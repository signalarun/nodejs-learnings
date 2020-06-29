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

* express-generator
  - Produces boilerplate code for an application
  - npm install express-generator -g
  - express <project_name>
## Node Package Manager or NPM
   Top NPM commands

    npm init: Displays a simple wizard to help you create and describe your new project.

    npm install module_name: Installs a module.

    npm install -g module_name: Install a global module.

    npm install module_name --save: Installs a module and adds it into the package.json file, inside dependencies.

    npm install module_name --save-dev: Installs a module and adds it into the package.json file, inside devDependencies.

    npm list: Lists all the modules installed on the project.

    npm list -g: Lists all the global modules installed on the OS.

    npm remove module_name: Uninstalls a module from the project.

    npm remove -g module_name: Uninstalls a global module.

    npm remove module_name --save: Uninstalls a module from the project and also removes it from the attribute dependencies.

    npm remove module_name --save-dev: Uninstalls a module from the project and also removes it from the attribute devDependencies.

    npm update module_name: Updates the module version.

    npm update -g module_name: Updates the global module version.

    npm -v: Displays the NPM current version.

    npm adduser username: Creates an account to https://npmjs.org .

    npm whoami: Displays details of your public NPM profile (you must create an account using the previous command).

    npm publish: Publishes a module to npmjs.org (it’s necessary to have an active account first ).
    
## Middleware  
   * Middleware functions can perform the following tasks:
     - Execute any code.
     - Make changes to the request and the response objects.
     - End the request-response cycle.
     - Call the next middleware function in the stack.
   * Express has the following built-in middleware functions:
     - express.static serves static assets such as HTML files, images, and so on.
     - express.json parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
     - express.urlencoded parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+


