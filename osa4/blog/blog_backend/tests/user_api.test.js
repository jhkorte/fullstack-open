const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const logger = require('../utils/logger')

const api = supertest(app)

describe('when there is one user in the database', () => {
  beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('password123', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('creation successful, using username not already in database', async () => {
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
})




after(async () => {
  await mongoose.connection.close()
})