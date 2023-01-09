const blogRouter = require('express').Router()
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()}

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

blogRouter.post('/', async (req, res, next) => {
    try{
        const blog = await Blog.create(req.body)
        res.json(blog)
    } catch (error) {
        next(error)
    }
})

blogRouter.get('/:id', blogFinder, (req, res, next) => {
    if (req.blog) {
        res.json(req.blog)
    }else{
        res.status(400).end()
    }
})

blogRouter.put('/:id', blogFinder, async (req, res) => {
    if (req.blog && req.body.likes) {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

blogRouter.delete('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
        await req.blog.destroy()
    }
    res.status(204).end()
})

module.exports = blogRouter