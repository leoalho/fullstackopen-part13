const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const {User, Session} = require('../models')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  user.disabled = false
  user.save()

  const token = jwt.sign(user.id, SECRET)

  await Session.create({key: token, userId: user.id})

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router