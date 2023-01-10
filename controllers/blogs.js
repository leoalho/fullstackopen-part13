const blogRouter = require('express').Router()
const { Blog, User } = require('../models')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            console.log(authorization.substring(7))
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch (error){
            console.log(error)
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()}

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()}

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

blogRouter.post('/', tokenExtractor, async (req, res, next) => {
    try{
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({...req.body, userId: user.id})
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