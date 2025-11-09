const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const BlogRouter = require('./controllers/bloglist')
const UserRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { errorHandler } = require('./utils/middleware')
const app = express()
const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)

// app.use(tokenExtractor, BlogRouter)
// app.use(userExtractor, BlogRouter)
app.use(express.json())
app.use('/api/blogs', BlogRouter)
app.use('/api/users', UserRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)

module.exports = app