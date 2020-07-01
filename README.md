# NODE.JS LEARNINGS
Learnings and sample applications on nodejs. Repository is being tried to, build on [The Twelve-Factor App methodology](https://12factor.net/).

## Some Architectural perspectives
 * [Layered view example](https://softwareontheroad.com/ideal-nodejs-project-structure/)
   - This discusses about driving control flow along layers namely Controller-Service-DataAccess layers. Its identical to Spring Boot controll flows
## Coding convention
 * [Javascript style guide by Google](https://google.github.io/styleguide/jsguide.html)

## Developement environment configuration and tools
 * [EditorConfig](https://editorconfig.org/)  
    - “EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.”
    - Create .editconfig file in your root. Sample
       ```
         root = true
         [*]
         indent_style = space
         indent_size = 2
         charset = utf-8
         trim_trailing_whitespace = false
         insert_final_newline = true
       ```  
 * [npm semver calculator](https://semver.npmjs.com/)
    - Useful to know the semantic version of NPM packages and there by configure your package.json.
## Useful APIs
   * For random images  
         https://source.unsplash.com/random/60x60

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
* dotenv
  - npm install dotenv
  - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
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
     - ![next](/assets/next.png)
   * Express has the following built-in middleware functions:
     - express.static serves static assets such as HTML files, images, and so on.
     - express.json parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
     - express.urlencoded parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+
     - Application level middleware app.use
     - Router level middleware router.use     
       + Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router()
   * [Serving static files in Express](https://expressjs.com/en/starter/static-files.html)
     - To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express     


