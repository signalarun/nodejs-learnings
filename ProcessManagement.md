
# Process Management
 Process management can be done by PM2 
 
## Installation
 * npm install  --save pm2@latest
 
## Deployment
 * Start
    - pm2 start server.js
 * Running on several cpu cores
    - pm2 start server.js -i max  
      max means either auto detect cores or run on given number of cores
