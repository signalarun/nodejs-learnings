# NODE.JS LEARNINGS
Learnings and sample applications on nodejs. Repository is being tried to, build on [The Twelve-Factor App methodology](https://12factor.net/).

## Some Architectural perspectives
 * [Layered view example](https://softwareontheroad.com/ideal-nodejs-project-structure/)
   - This discusses about driving control flow along layers namely Controller-Service-DataAccess layers. Its identical to Spring Boot controll flows
 * [https://mdn.mozillademos.org/files/14456/MVC%20Express.png](https://mdn.mozillademos.org/files/14456/MVC%20Express.png)
## Coding convention
 * [Javascript style guide by Google](https://google.github.io/styleguide/jsguide.html)
 * Linter
   - A tool that can be used to enforce the coding conventions.ESLint is an opensource linter for Javascript.ESLint documents your rules inside a configuration file
     named .eslintrc. Developers could also customize the rules.

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
    - express <project_name> -e --ejs // for generation with ejs engine
* express-generator-api
  - Produces boilerplate code for api server
  - npm install -g express-generator-api
  - express-api <project_name>
* express-validator [NPM](https://www.npmjs.com/package/express-validator) [Github](https://express-validator.github.io/docs/)
  - It is a set of express.js middlewares that wraps validator.js validator and sanitizer functions.
  - https://flaviocopes.com/express-validate-input/
* [http-status-codes](https://www.npmjs.com/package/http-status-codes)
  - Constants enumerating the HTTP status codes. Based on the Java Apache HttpStatus API.
    All status codes defined in RFC1945 (HTTP/1.0), RFC2616 (HTTP/1.1), RFC2518 (WebDAV), RFC6585 (Additional HTTP Status Codes),
    and RFC7538 (Permanent Redirect) are  supported.
* [module-generator](https://www.npmjs.com/package/module-generator)
  - The generator script that can be used for fresh modules.
  - [How to create nodejs modules](https://www.digitalocean.com/community/tutorials/how-to-create-a-node-js-module)
* dotenv
  - npm install dotenv
  - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

* connect-flash
  - The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user. The flash 
    is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.
* [passport](http://www.passportjs.org/)
  - Express lacks itsown authentication libraries, here comes the handy 'passport' library
    + passport-local
      * [username password](http://www.passportjs.org/docs/username-password/)  
        The most widely used way for websites to authenticate users is via a username and password. Support for this mechanism is provided by the passport-local 
        module.       
      * [https://github.com/jaredhanson/passport-local](https://github.com/jaredhanson/passport-local)
    + [https://github.com/passport/express-3.x-http-digest-example](https://github.com/passport/express-3.x-http-digest-example)
    + [https://github.com/passport/express-3.x-http-basic-example](https://github.com/passport/express-3.x-http-basic-example)
 * [connect-ensure-login](https://www.npmjs.com/package/connect-ensure-login) 
      - This middleware ensures that a user is logged in. If a request is received that is unauthenticated, the request will be redirected to a login page.  
        The URL will  be saved in the session, so the user can be conveniently returned to the page that was originally requested.This middleware integrates
        seamlessly with Passport.
 * [Chance](https://www.npmjs.com/package/chance)
   - Chance is a minimalist generator of random strings, numbers, etc. to help reduce some monotony particularly while writing automated tests or anywhere else
     you need anything random.
 * [Chalk](https://www.npmjs.com/package/chalk)
   - Helps to style Console string
 * [Multer](https://www.npmjs.com/package/multer)
   - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
   - Supports only multipart form data
 * Advanced
    - PM2
    - [get-port](https://www.npmjs.com/package/get-port)
    - [Helmet](https://www.npmjs.com/package/helmet) helps you secure your Express apps by setting various HTTP headers appropriately.
       + csp sets the Content-Security-Policy header to help prevent cross-site scripting attacks and other cross-site injections.
       + hidePoweredBy removes the X-Powered-By header.
       + hsts sets Strict-Transport-Security header that enforces secure (HTTP over SSL/TLS) connections to the server.
       + ieNoOpen sets X-Download-Options for IE8+.
       + noCache sets Cache-Control and Pragma headers to disable client-side caching.
       + noSniff sets X-Content-Type-Options to prevent browsers from MIME-sniffing a response away from the declared content-type.
       + frameguard sets the X-Frame-Options header to provide clickjacking protection.
       + xssFilter sets X-XSS-Protection to enable the Cross-site scripting (XSS) filter in most recent web browsers.
       ```       
       // This...
       app.use(helmet());

       // ...is equivalent to this:
       app.use(helmet.contentSecurityPolicy());
       app.use(helmet.dnsPrefetchControl());
       app.use(helmet.expectCt());
       app.use(helmet.frameguard());
       app.use(helmet.hidePoweredBy());
       app.use(helmet.hsts());
       app.use(helmet.ieNoOpen());
       app.use(helmet.noSniff());
       app.use(helmet.permittedCrossDomainPolicies());
       app.use(helmet.referrerPolicy());
       app.use(helmet.xssFilter());
       ```
    - [SCMP](https://github.com/freewil/scmp)
       Safe, constant-time comparison of Buffers.Helps to minimize [timing attacks](https://codahale.com/a-lesson-in-timing-attacks/).
       
    - Analyse dependecies since that can lead to vulnarabilities
      http://npm.broofa.com a site where you can upload a package.json file and get a visualization of the dependencies
      
      + Does using a module hide significant complexity or save a significant amount of work?
      + Is the module from a trusted source?
      + Does it have a lot of sub-dependencies?
    - Performance optimization
      + [Babel](https://babeljs.io/docs/en/) is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in  current
        and older browsers or   environments.
      + [Webpack](https://webpack.js.org/guides/getting-started/) is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset. 

              
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
   * [https://medium.com/@jamischarles/what-is-middleware-a-simple-explanation-bb22d6b41d01](https://medium.com/@jamischarles/what-is-middleware-a-simple-explanation-bb22d6b41d01)
   * Express has the following built-in middleware functions:
     - express.static serves static assets such as HTML files, images, and so on.
     - express.json parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
     - express.urlencoded parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+
     - Application level middleware app.use
     - Router level middleware router.use     
       + Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of express.Router()
   * [Serving static files in Express](https://expressjs.com/en/starter/static-files.html)
     - To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express  
## Exports and Imports
   * When to use module.exports vs exports:
     - Use exports to:
       + Export named function. e.g. exports.area, exports.circumference.
     - Use module.exports to:
       + If you want to export an object, class, function at the root level (e.g. module.exports = Cat)
       + If you prefer to return a single object that exposes multiple assignments. e.g.module.exports = {area, circumference};
## Session Management
   * [Express Session](https://flaviocopes.com/express-sessions/)
   * [Storing user sessions on server with Express](https://medium.com/javascript-in-plain-english/storing-user-sessions-on-the-server-with-express-session-422fe11bc500)
       
## Tutorial
   * Create a paginated API with Node.js (https://youtu.be/ZX3qt0UWifc)

   
   
 


