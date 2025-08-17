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

describe('when there is one user in the database', () => {
  beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('password123', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })
})




after(async () => {
  await mongoose.connection.close()
})