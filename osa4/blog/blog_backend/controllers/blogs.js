const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }
  const users = await User.find({})
  console.log('all users', users)
  console.log('this is the decode token', decodedToken)

  const user = await User.findById(decodedToken.id)
  console.log("found this user with id from decoded token", user)

  
  if (!user) {
    return response.status(400).json({ error: 'user id missing or invalid' })
  }
  

  const blog = new Blog({
    title: body.title || "ERR_NO_TITLE", // If no title, make it this so it wont be saved to db
    author: body.author,
    url: body.url || "ERR_NO_URL",
    likes: body.likes || 0, // If doesn't have likes, init it to 0
    user: user._id
  })

  if (blog.title === "ERR_NO_TITLE") return response.status(400).json({ error: 'title missing'})
  if (blog.url === "ERR_NO_URL") return response.status(400).json({ error: 'url missing'})

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)

  console.log('blog to delete', blogToDelete)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  console.log('decodedtoken for delete', decodedToken)

  if (!(blogToDelete.user.toString() === decodedToken.id)) {
    return response.status(401).json({ error: 'invalid user for this blog' })
  }

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