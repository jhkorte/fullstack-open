const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned and in correct JSON format', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('making sure id field is "id", not "_id"  ', async () => {
	const blogs = await helper.blogsInDatabase()

	blogs.forEach(blog => {
  	assert(blog.hasOwnProperty('id'));
  	assert(!blog.hasOwnProperty('_id'));
	})
})

test('blogs can be added, size increments correctly and new blog title is found', async () => {
	const blogsAtStart = await helper.blogsInDatabase()

	const newBlog = {
	  title: "This is a new blog",
	  author: "Bloggy McBlogger",
      url: "https://example.com/",
	  likes: 123,
	}

	await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDatabase()
	assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

	const blogTitles = blogsAtEnd.map(b => b.title)
	assert(blogTitles.includes('This is a new blog'))
})

test('when "likes" field is empty, initialize it to 0', async () => {
	const blogsAtStart = await helper.blogsInDatabase()

	const newBlog = {
	  title: "This is a new blog with no likes",
	  author: "Bloggy McBlogger",
      url: "https://example.com/",
	}

	await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDatabase()

	const blogLikes = blogsAtEnd.map(b => b.likes)
	console.log(blogLikes)
	// If undefined is included in the blogLikes, then that means some of the blogs dont have a "likes" field.
	assert(!blogLikes.includes(undefined))
})


after(async () => {
  await mongoose.connection.close()
})