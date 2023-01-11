const express = require('express')
//require('express-async-errors')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const readingistRouter = require('./controllers/readinglist')
const logoutRouter = require('./controllers/logout')
const middleware = require('./util/middleware')

const app = express()
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglist', readingistRouter)
app.use('/api/logout', logoutRouter)
app.use(middleware.errorHandler)

const main = async () => {
    await connectToDatabase()

    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })
}

main()
