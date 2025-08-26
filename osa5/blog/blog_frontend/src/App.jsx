import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(sortBlogsByLikes) )
    )
  }, [])

  const sortBlogsByLikes = (blog1, blog2) => {
    if (blog1.likes > blog2.likes) return -1
    else if (blog1.likes < blog2.likes) return 1
    return 0
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in from frontend with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('login success!')
    // eslint-disable-next-line no-unused-vars
    } catch (exception) {
      console.log('login failed')
      setErrorMessage('no user found with these credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('user from App/addBlog: ',user)
    console.log('this is the blog before ADDING', blogObject)
    const userForBlog = user
    console.log('userforblog',userForBlog)
    const addedBlog = { ...blogObject, user: userForBlog }
    console.log(addedBlog)
    const returnedBlog = await blogService.create(addedBlog)
    console.log(returnedBlog)
    returnedBlog.user = userForBlog

    setBlogs(blogs.concat(returnedBlog))
  }

  const updateBlog = async (blogObject) => {
    console.log('liking from app.jsx with blog id',blogObject.id)
    console.log('this is the blog before adding like', blogObject)
    console.log(blogObject.user)
    const userForBlog = blogObject.user
    console.log(userForBlog)
    const updatedBlog = { ...blogObject, likes: blogObject.likes +1, user: userForBlog }
    const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)
    returnedBlog.user = userForBlog
    console.log('returnedblog:',returnedBlog)
    setBlogs(blogs.map(b => b.id !== blogObject.id ? b : returnedBlog).sort(sortBlogsByLikes))
    console.log('THIS IS AFTER ADDING LIKE', returnedBlog)
    console.log(returnedBlog.user)
  }

  const deleteBlog = async (blogObject) => {
    const blogToRemove = blogObject
    console.log('blogtoremove:',blogToRemove)
    console.log('attempting to delete blog of id:', blogToRemove.id)
    const res = await blogService.remove(blogToRemove.id)
    console.log(res)
    setBlogs(blogs.filter(b => b.id !== blogToRemove.id).sort(sortBlogsByLikes))
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
						username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
						password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  const logOut = () => (
    <div>
      <button onClick={() => {
        window.localStorage.clear()
        window.location.reload()
      }}>Log out</button>
    </div>
  )


  return (
    <div>
      <Notification message={errorMessage} />
      <h1>The Bloglist</h1>

      {!user && loginForm()}
      {user && <div>
        <div> {user.name} is logged in {logOut()} </div>
        <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} currentlyLoggedUser={user}/>
      )}
    </div>
  )
}

export default App