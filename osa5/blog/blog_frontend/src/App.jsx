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
      setBlogs( blogs )
    )  
  }, [])

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
		const blog = await blogService.create(blogObject)
		setBlogs(blogs.concat(blog))
	}

	const updateBlog = async (blogObject) => {
		console.log('liking from app.jsx with blog id',blogObject.id)
		const updatedBlog = {...blogObject, likes: blogObject.likes +1}
		const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)
		console.log('returnedblog:',returnedBlog)
		setBlogs(blogs.map(b => b.id !== blogObject.id ? b : returnedBlog))
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
								onChange={({target}) => setUsername(target.value)}
							/>
					</div>
					<div>
						password
							<input
								type="text"
								value={password}
								name="Password"
								onChange={({target}) => setPassword(target.value)}
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
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
      )}
    </div>
  )
}

export default App