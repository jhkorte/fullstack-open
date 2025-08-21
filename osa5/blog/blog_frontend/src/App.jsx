import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in from frontend with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

			blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
			console.log('login success!')
    } catch (exception) {
			console.log('login failed')
      setErrorMessage('no user found with these credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

	const handleBlogChange = async (e) => {
		setNewBlog({...newBlog, [e.target.name]: e.target.value})
	}

	const addBlog = async (e) => {
		e.preventDefault()
		console.log('submitting new blog with', newBlog)

		try {
			const blog = await blogService.create(newBlog)
			console.log('created blog:', blog)
			setNewBlog({ title: '', author: '', url: '', })
		} catch (exception) {
			console.log('failed to create blog. exception:', exception)
		}
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
					<button type="submit">login</button>
				</form>
		</div>
	)

  const blogForm = () => (
		<div>
			<h2>Create new Blog</h2>

			<form onSubmit={addBlog}>
					<div>
						title
							<input
								type="text"
								value={newBlog.title}
								name="Title"
								onChange={({target}) => setNewBlog({...newBlog, title:target.value})}
							/>
					</div>
					<div>
						author
							<input
								type="text"
								value={newBlog.author}
								name="Author"
								onChange={({target}) => setNewBlog({...newBlog, author:target.value})}
							/>
					</div>
					<div>
						url
							<input
								type="text"
								value={newBlog.url}
								name="URL"
								onChange={({target}) => setNewBlog({...newBlog, url:target.value})}
							/>
					</div>
					<button type="submit">Submit new blog</button>
				</form>
		</div>
	)


  return (
    <div>
			<h1>The Bloglist</h1>
			
      <Notification message={errorMessage} />
      
      {!user && loginForm()}
			{user && <div>
				<p> {user.name} is logged in </p>
					{blogForm()}
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