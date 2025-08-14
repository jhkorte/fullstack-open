const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title || "ERR_NO_TITLE", // If no title, make it this so it wont be saved to db
    author: body.author,
    url: body.url || "ERR_NO_URL",
    likes: body.likes || 0 // If doesn't have likes, init it to 0
  })

  if (blog.title === "ERR_NO_TITLE") return response.status(400).json({ error: 'title missing'})
  if (blog.url === "ERR_NO_URL") return response.status(400).json({ error: 'url missing'})

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const blogToUpdate = await Blog.findById(request.params.id)
  if (!blogToUpdate) return response.status(404).end()

  blogToUpdate.likes = likes
  const savedBlog = await blogToUpdate.save()
  response.status(200).json(savedBlog)
})

module.exports = blogsRouter