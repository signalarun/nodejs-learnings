
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
 * Stop
    - pm2 stop server.js
 * Monitor logs, custom metrics, process information from all processes
    - pm2 monit
 * List all processes
    - pm2 list
