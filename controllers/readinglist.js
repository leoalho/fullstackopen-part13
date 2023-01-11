const router = require('express').Router()

const User = require('../models/user')
const Readinglist = require('../models/readinglist')

router.post('/', async (req, res, next) => {
    try {
        const link = await Readinglist.create(req.body)
        res.json(link)
    } catch(error) {
        next(error)
    }
})

router.put('/:id', async (req, res) => {
    const readinglist = await Readinglist.findByPk(req.params.id)
    if (readinglist && req.body.read){
        readinglist.read = req.body.read
        await readinglist.save()
        res.json(readinglist)
    } else {
        res.status(404).end()
    }
})

module.exports = router