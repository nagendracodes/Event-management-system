class ApiError extends Error {
    
    constructor(
        statusCode,
        message = "Something Went Wrong",
        errors = [],
    ){
        super(message)
        this.statusCode = statusCode; // HTTP status code for the error
        this.data = null; // Additional data (can be used to send more information about the error)
        this.message = message; // Error message
        this.success = false; // Flag indicating whether the operation was successful or not
        this.errors = errors;
    }
}

export {ApiError}