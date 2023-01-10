const authorRouter = require('express').Router()
const { Blog, User } = require('../models')
const { Op } = require('sequelize')
const { sequelize } = require('../util/db')

authorRouter.get('/', async (req, res) => {
    authors = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
        ],
        group: 'author'
    });
    res.json(authors)
})

module.exports = authorRouter