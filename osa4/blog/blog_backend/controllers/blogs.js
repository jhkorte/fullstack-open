const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save()
  .then((result) => {
    response.status(201).json(result)
    logger.info('added a new blog', result)
    Blog.find({}).then(blogs => {
        logger.info('After adding the new blog:')
        blogs.forEach(blog => logger.info(blog))
        logger.info('-----------------------------------------')
    })
  })
})


module.exports = blogsRouter