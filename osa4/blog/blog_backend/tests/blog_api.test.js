const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)


describe('when there are some initial blogs', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)

	await User.deleteMany({})

	const passwordHash = await bcrypt.hash('password123', 10)
	const user = new User({ username: 'root', passwordHash })

	await user.save()
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



  describe('when adding new blog, with jwt tokens', () => {

		test('blogs can be added, size increments correctly and new blog title is found', async () => {
			const blogsAtStart = await helper.blogsInDatabase()
			const usersAtStart = await helper.usersInDatabase()
      const userThatAddsBlog = usersAtStart[0] //this is the user with name 'root', created in beforeEach
      
      const loginRes = await api.post('/api/login').send({username: 'root', password: 'password123'}).expect(200)
      const loginToken = loginRes.body.token

			const newBlog = {
				title: "This is a new blog",
				author: "Bloggy McBlogger",
				url: "https://example.com/",
				likes: 123,
				userId: userThatAddsBlog.id
			}

			await api.post('/api/blogs').set('Authorization', `Bearer ${loginToken}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)

			const blogsAtEnd = await helper.blogsInDatabase()
			assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

			const blogTitles = blogsAtEnd.map(b => b.title)
			assert(blogTitles.includes('This is a new blog'))
		})


		test('when "likes" field is empty in new blog, initialize it to 0', async () => {
			const blogsAtStart = await helper.blogsInDatabase()
			const usersAtStart = await helper.usersInDatabase()
			const userThatAddsBlog = usersAtStart[0] //this is the user with name 'root', created in beforeEach

      const loginRes = await api.post('/api/login').send({username: 'root', password: 'password123'}).expect(200)
      const loginToken = loginRes.body.token

			const newBlog = {
				title: "This is a new blog with no likes",
				author: "Bloggy McBlogger",
				url: "https://example.com/",
				userId: userThatAddsBlog.id
			}

			const response = await api.post('/api/blogs').set('Authorization', `Bearer ${loginToken}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
			console.log(response.body)

			const blogsAtEnd = await helper.blogsInDatabase()

			const blogLikes = blogsAtEnd.map(b => b.likes)

			// If undefined is included in the blogLikes, then that means some of the blogs dont have a "likes" field.
			assert(!blogLikes.includes(undefined))
		})


		test('if new blog doesnt have title or url, return 400 bad request', async () => {
			const blogsAtStart = await helper.blogsInDatabase()
			const usersAtStart = await helper.usersInDatabase()
      const userThatAddsBlog = usersAtStart[0] //this is the user with name 'root', created in beforeEach

      const loginRes = await api.post('/api/login').send({username: 'root', password: 'password123'}).expect(200)
      const loginToken = loginRes.body.token

			const newBlogNoTitle = {
				author: "Bloggerdude",
				url: "https://myblogdoesnthaveatitle.com",
				userId: userThatAddsBlog.id
			}

			const newBlogNoUrl = {
				title: "The blog without a URL",
				author: "Bloggerdude",
				userId: userThatAddsBlog.id
			}

			await api.post('/api/blogs').set('Authorization', `Bearer ${loginToken}`).send(newBlogNoTitle).expect(400)
			await api.post('/api/blogs').set('Authorization', `Bearer ${loginToken}`).send(newBlogNoUrl).expect(400)

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
	
	
	describe('when updating a blog', () => {

		test('updating likes for a single blog', async () => {
			const blogsAtStart = await helper.blogsInDatabase()
			const blogToUpdate = blogsAtStart[0]

			const response = await api.put(`/api/blogs/${blogToUpdate.id.toString()}`).send({ likes: 99999 }).expect(200).expect('Content-Type', /application\/json/)

			const blogsAtEnd = await helper.blogsInDatabase()
			const blogAfterUpdating = blogsAtEnd.find(b => b.id === blogToUpdate.id)
			
			assert.strictEqual(blogAfterUpdating.likes, 99999)
			assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
		})
	})


})

describe('when there is one user in the database', () => {
  beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('password123', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('creation successful, using username not already in database, username and password long enough', async () => {
      const usersAtStart = await helper.usersInDatabase()

      const newUser = {
        username: 'elkku',
        name: 'esa sallinen',
        password: 'logistiikkainsinoori'
      }

      await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDatabase()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('creation UNsuccessful, using username not already in database, username and password NOT LONG ENOUGH', async () => {
      const usersAtStart = await helper.usersInDatabase()

      const newUser = {
        username: 'elkku',
        name: 'esa sallinen',
        password: 'a'
      }

      await api.post('/api/users').send(newUser).expect(400)

      const usersAtEnd = await helper.usersInDatabase()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)

      const usernames = usersAtEnd.map(u => u.username)
      assert(!usernames.includes(newUser.username))
    })

    test('creation UNsuccessful, using username already IN database', async () => {
      const usersAtStart = await helper.usersInDatabase()

      const newUser = {
        username: 'root',
        name: 'kimi räikkönen',
        password: 'ferrari'
      }

      await api.post('/api/users').send(newUser).expect(400)

      const usersAtEnd = await helper.usersInDatabase()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)

      const names = usersAtEnd.map(u => u.name)
      assert(!names.includes(newUser.name))
    })

	test('logging in with valid credentials returns 200 OK', async () => {
		const userForLogin = {
			username: 'root',
			password: 'password123'
		}

		await api.post('/api/login').send(userForLogin).expect(200)
	})

	test('logging in with invalid credentials returns 401 Unauthorized', async () => {
		const userForLogin = {
			username: 'roott',
			password: 'password123'
		}

		await api.post('/api/login').send(userForLogin).expect(401)
	})
})



after(async () => {
  await mongoose.connection.close()
})