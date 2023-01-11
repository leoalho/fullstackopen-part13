const router = require('express').Router()

const { User, Blog, Readinglist } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
        model: Blog
    }
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    next(error)
  }
})

router.put('/:username', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user && req.body.name) {
        user.name = req.body.name
        await user.save()
        res.json(user)
    } else {
        res.status(404).end()
    }
})

router.get('/:id', async (req, res) => {
  var where = {}
  if (req.query.read){
    if (req.query.read==='true'){
        where.read = true
    }
    if (req.query.read==='false'){
        where.read = false
    }
  }
  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
        through: {
            attributes: ['id', 'read'],
            where
        }
    },

  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router