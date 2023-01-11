const router = require('express').Router()

const { Blog, User, Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
    const session = await Session.findOne({
        where: {
            userId: req.decodedToken
        }
    })
    await session.destroy()
    res.status(200).end()

})

module.exports = router