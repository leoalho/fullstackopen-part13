const express = require('express')
//require('express-async-errors')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const blogRouter = require('./controllers/blogs')
const middleware = require('./util/middleware')

const app = express()
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(middleware.errorHandler)

const main = async () => {
    await connectToDatabase()

    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })
}

main()
