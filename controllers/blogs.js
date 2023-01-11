const blogRouter = require('express').Router()
const { Blog, User, Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')
const { Op } = require('sequelize')


const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()}

blogRouter.get('/', async (req, res) => {
    var where = {}
    if (req.query.search){
        where = {
            [Op.or]: [
                {
                    title: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                },
                {
                    author: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                }
            ]
        }
    }
    
    const blogs = await Blog.findAll({
        order: [['likes', 'DESC']],
        where,
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        }})
    res.json(blogs)
})

blogRouter.post('/', tokenExtractor, async (req, res, next) => {
    try{
        const user = await User.findByPk(req.decodedToken)
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

blogRouter.delete('/:id', [blogFinder, tokenExtractor], async (req, res, next) => {
    try{
        const user = await User.findByPk(parseInt(req.decodedToken))
        if (user.id === req.blog.userId){
            await req.blog.destroy()
            res.status(200).end()
        }else {
            res.status(401).end()
        }
    } catch(error) {
        console.log(error)
        next(error)
    }
})

module.exports = blogRouter