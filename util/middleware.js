const errorHandler = (error, request, response, next) => {
    console.log(error.name)
    if (error.name === 'SequelizeValidationErrorr') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
}

module.exports = {errorHandler}