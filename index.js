require('dotenv').config()
const { Sequelize, Model, QueryTypes, DataTypes } = require('sequelize')

const express = require('express')

const blogrouter = require('./controllers/blogs')
const { blogModel } = require('./models/Blog')

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3001

const main = async () => {
    const sequelize = new Sequelize(process.env.DATABASE_URL)

    try {
        await sequelize.authenticate()
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }

    const Blog = blogModel(sequelize)

    app.get('/api/blogs', async (req, res) => {
        const blogs = await Blog.findAll()
        res.json(blogs)
    })
    
    app.post('/api/blogs', async (req, res, next) => {
        try{
            console.log(req.body)
            const blog = await Blog.create(req.body)
            res.json(blog)
        } catch (error) {
            console.log(error)
            res.status(400).end()
        }
    })
    
    app.delete('/api/blogs/:id', async (req, res) => {
        try{
        const blog = await Blog.destroy({
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

    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })

}

main()
