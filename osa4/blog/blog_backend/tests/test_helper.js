const Blog = require('../models/blog')
const User = require('../models/user')


const initialUsers = [
  {
    username:	"jakessufromSUPERTEST",
    name:	"Jaakko Hyvönen",
    id:	"68a20d0fa8a4d5b6032fe3ea",
  }
]
const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: initialUsers[0].id
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: initialUsers[0].id
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: initialUsers[0].id
  },
]


const blogsInDatabase = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDatabase = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}



module.exports = {
    initialBlogs, initialUsers, blogsInDatabase, usersInDatabase
}