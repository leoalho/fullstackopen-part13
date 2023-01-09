const errorHandler = (error, request, response, next) => {
    console.log(error.name)
    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'malformatted id' })
    } else if (error.name === 'SequelizeValidationErrorr' || error.name === 'MongoServerError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
}

module.exports = {errorHandler}