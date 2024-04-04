// Defining a higher-order function named asyncHandler
const asyncHandler = (requestHandler) => {
    // Returning a middleware function that wraps the provided requestHandler
    return (req, res, next) => {
        // Wrapping the execution of the requestHandler in a Promise
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err)); // Handling any errors and passing them to the next middleware
    }
}

// Exporting the asyncHandler function to make it available for use in other modules
export { asyncHandler };