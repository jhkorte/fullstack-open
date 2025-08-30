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
          <label>
            Title
            <input
              type="text"
              value={newBlog.title}
              name="Title"
              onChange={({ target }) => setNewBlog({ ...newBlog, title:target.value })}
              placeholder='Blog title here...'
            />
          </label>
        </div>
        <div>
          <label>
						Author
            <input
              type="text"
              value={newBlog.author}
              name="Author"
              onChange={({ target }) => setNewBlog({ ...newBlog, author:target.value })}
              placeholder='Blog author here...'
            />
          </label>
        </div>
        <div>
          <label>
						URL
            <input
              type="text"
              value={newBlog.url}
              name="URL"
              onChange={({ target }) => setNewBlog({ ...newBlog, url:target.value })}
              placeholder='Blog URL here...'
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default BlogForm