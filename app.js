const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const BlogRouter = require('./controllers/bloglist')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(express.json())
app.use('/api/blogs', BlogRouter)

module.exports = app