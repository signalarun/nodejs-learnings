
module.exports = class ApiResponse {

    /**
     * timestamp - The time that the errors were extracted
     * status - The status code
     * error - The error reason
     * exception - The class name of the root exception (if configured)
     * message - The exception message (if configured)
     * errors - Any ObjectErrors from a BindingResult exception (if configured)
     * trace - The exception stack trace (if configured)
     * path - The URL path when the exception was raised
     * : Taken from Spring Boot DefaultErrorAttributes
     * 
     * @param {*} data 
     * @param {*} status - status code
     * @param {*} error - The error reason
     * @param {*} message - Application message
     */
    constructor(data, status, error = 'The error reason', message = 'App message') {
        this.timestamp = new Date(new Date().toUTCString()).getTime();
        if(typeof status === undefined){
            throw 'Status cannot be undefined'
        }else{
            this.status = status;
        }
        
        this.messgae = message;
        this.data = data;
    }

    build() {
        return {
            'timestamp': this.timestamp,
            'status': this.status,
            'error' :this.error,
            'message': this.messgae,
            'data': this.data
        };
    }

};