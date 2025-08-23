import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', })
  
  const addBlog = async (e) => {
    e.preventDefault()
    console.log('submitting new blog with', newBlog)
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '', })
  }

  return (
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
					<button type="submit">Submit</button>
				</form>
		</div>
  )
}

export default BlogForm