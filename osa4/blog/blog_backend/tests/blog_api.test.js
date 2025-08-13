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

	console.log(blogs)

	blogs.forEach(blog => {
  	assert(blog.hasOwnProperty('id'));
  	assert(!blog.hasOwnProperty('_id'));
	})
})



after(async () => {
  await mongoose.connection.close()
})