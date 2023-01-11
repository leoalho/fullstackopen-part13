const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Session } = require('../models')

const errorHandler = (error, request, response, next) => {
    console.log(error.name)
    return response.status(400).json({ error: error.message })
}

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            console.log(authorization.substring(7))
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
            const session = await Session.findOne({
                where: {
                    userId: req.decodedToken
                }
            })
            console.log(session)
            if (session.key !== authorization.substring(7)){
                return res.status(401).json({ error: 'Session timed out' })
            }
        } catch (error){
            console.log(error)
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

module.exports = {errorHandler, tokenExtractor}