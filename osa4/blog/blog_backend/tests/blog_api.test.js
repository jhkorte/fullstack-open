const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


describe('when there are some initial blogs', async () => {

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



  describe('when adding new blog', async () => {

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


		test('when "likes" field is empty in new blog, initialize it to 0', async () => {
			const blogsAtStart = await helper.blogsInDatabase()

			const newBlog = {
				title: "This is a new blog with no likes",
				author: "Bloggy McBlogger",
				url: "https://example.com/",
			}

			await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

			const blogsAtEnd = await helper.blogsInDatabase()

			const blogLikes = blogsAtEnd.map(b => b.likes)

			// If undefined is included in the blogLikes, then that means some of the blogs dont have a "likes" field.
			assert(!blogLikes.includes(undefined))
		})


		test('if new blog doesnt have title or url, return 400 bad request', async () => {
			const blogsAtStart = await helper.blogsInDatabase()

			const newBlogNoTitle = {
				author: "Bloggerdude",
					url: "https://myblogdoesnthaveatitle.com",
			}

			const newBlogNoUrl = {
				title: "The blog without a URL",
				author: "Bloggerdude",
			}

			await api.post('/api/blogs').send(newBlogNoTitle).expect(400)
			await api.post('/api/blogs').send(newBlogNoUrl).expect(400)

			const blogsAtEnd = await helper.blogsInDatabase()

			assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
		})
  })



	describe('when deleting a blog', () => {

		test('deleting a single blog', async () => {
			const blogsAtStart = await helper.blogsInDatabase()
			const blogToDelete = blogsAtStart[0]

			await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

			const blogsAtEnd = await helper.blogsInDatabase()

			const blogsTitles = blogsAtEnd.map(b => b.title)
			assert(!blogsTitles.includes(blogToDelete.title))

			assert.strictEqual(blogsAtStart.length, blogsAtEnd.length +1)
		})

	}) 
})



after(async () => {
  await mongoose.connection.close()
})