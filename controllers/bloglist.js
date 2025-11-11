const dotenv = require('dotenv')
dotenv.config()
// const jwt = require('jsonwebtoken')
const BlogRouter = require('express').Router()
const Blog = require('../models/bloglist')
const User = require('../models/user')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

BlogRouter.get('/', async (request, response) => {
  return response.status(200).json(await Blog.find({}).populate('user', { username: 1, name: 1 }))
})

BlogRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  // console.log('User Id', request.user)
  const userId = request.user
  // const verify_token = jwt.verify(request.token, process.env.SECRET)
  // console.log('Verified Token Id:', userId)
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({
      error: 'title and url are required'
    })
  }

  if(!request.body.likes) request.body.likes = 0

  const first_user = await User.findOne({ _id: userId })
  if (!first_user) {
    return response.status(400).json({
      error: 'no users found, cannot create blog without user'
    })
  }
  const blog = new Blog(request.body)

  blog.user = first_user._id
  first_user.blogs.push(blog._id)
  // console.log('===>',blog, first_user)

  const result = await blog.save()
  await first_user.save()
  response.status(201).json(result)
})

BlogRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const user = request.user
  // console.log('User attempting to delete blog:', user)
  const blogId = request.params.id

  const result = await Blog.findOneAndDelete({ _id: blogId, user: user })
  // console.log('Delete result:', result)
  if(!result) {
    return response.status(401).json({ error: 'Blog does not exists or you are not authorized to delete this blog' })
  }
  response.status(204).end()
})

BlogRouter.put('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const { likes } = request.body
  if (!likes)  {
    return response.status(400).json({
      error: 'likes field is required'
    })
  }

  const blog = await Blog.findById(request.params.id)
  if(!blog) {
    return response.status(404).end()
  }

  blog.likes = likes
  const updatedBlog = await blog.save()
  response.status(200).json(updatedBlog)
})

module.exports = BlogRouter