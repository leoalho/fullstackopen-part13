const errorHandler = (error, request, response, next) => {
    console.log(error.name)
    return response.status(400).json({ error: error.message })
}

module.exports = {errorHandler}