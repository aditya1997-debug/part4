const BlogRouter = require('express').Router()
const Blog = require('../models/bloglist')


BlogRouter.get('/', async (request, response) => {
  return response.status(200).json(await Blog.find({}))
})

BlogRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({
      error: 'title and url are required'
    })
  }

  if(!request.body.likes) request.body.likes = 0
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

BlogRouter.delete('/:id', async (request, response) => {
  const blogId = await Blog.findById(request.params.id)
  if(!blogId) {
    return response.status(404).end()
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

BlogRouter.put('/:id', async (request, response) => {
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