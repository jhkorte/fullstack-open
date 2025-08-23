import { useState, useEffect } from 'react'
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

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
		const blog = await blogService.create(blogObject)
		setBlogs(blogs.concat(blog))
	}
/*
	const addBlogOld = async (e) => {
		e.preventDefault()
		console.log('submitting new blog with', newBlog)

		try {
			const blog = await blogService.create(newBlog)
			console.log('created blog:', blog)
			setNewBlog({ title: '', author: '', url: '', })
			setErrorMessage('created new blog successfully!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
		} catch (exception) {
			console.log('failed to create blog. exception:', exception)
			setErrorMessage('failed to create blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
		}
	}
		*/

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

	/*
	const blogForm = () => {
		const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
		const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setBlogFormVisible(true)}>Create a blog yo</button>
				</div>
				<div style={showWhenVisible}>
					<BlogForm
						addBlog = {addBlog}
						handleTitleChange = {({target}) => setNewBlog({...newBlog, title:target.value})}
						handleAuthorChange = {({target}) => setNewBlog({...newBlog, author:target.value})}
						handleUrlChange = {({target}) => setNewBlog({...newBlog, url:target.value})}
						newBlogTitle = {newBlog.title}
						newBlogAuthor = {newBlog.author}
						newBlogUrl = {newBlog.url}
					/>
					<button onClick={() => setBlogFormVisible(false)}>Cancel blog yo</button>
				</div>
			</div>
		)
	}
	*/

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
				<p> {user.name} is logged in {logOut()} </p>
					
					<Togglable buttonLabel="Blogform from app.jsx">
						<BlogForm createBlog={addBlog} />
					</Togglable>
				</div>
			}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App