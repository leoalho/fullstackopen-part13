const blogRouter = require('express').Router()
const { Blog } = require('../models')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
    try{
        console.log(req.body)
        const blog = await Blog.create(req.body)
        res.json(blog)
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
})

blogRouter.delete('/:id', async (req, res) => {
    try{
        await Blog.destroy({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).end()
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
})

module.exports = blogRouter