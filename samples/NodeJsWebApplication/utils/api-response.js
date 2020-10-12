
export class ApiResponse {

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
     * 
     * @param {number} status - status code
     * @param {string} error - The error reasonm
     * @param {string} message - Application message
     * @param {object} data - Data after execution
     */
    constructor(status, error = 'The error reason', message = 'App message', data) {
        this.timestamp = new Date(new Date().toUTCString()).getTime();
        this.status = status;
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

}