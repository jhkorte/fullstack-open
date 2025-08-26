import { useState } from 'react'


const Blog = ({ blog, updateBlog, deleteBlog, }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 0,
    marginBottom: 7
  }
  const [showAllInfo, setShowAllInfo] = useState(false)

  const infoMinimum = { display: showAllInfo ? 'none' : '' }
  const infoAll = { display: showAllInfo ? '' : 'none' }

  const toggleShowAllInfo = () => {
    setShowAllInfo(!showAllInfo)
  }

  const likeIncrement = async (blogToBeUpdated) => {
    console.log('updating from blog.jsx')
    updateBlog(blogToBeUpdated)
  }

  const blogDelete = async (blogToBeDeleted) => {
    const deleteConfirmation = window.confirm(`Delete "${blogToBeDeleted.title}" by ${blogToBeDeleted.author}?`)
    if (!deleteConfirmation) return
    console.log('deleting blog with id', blogToBeDeleted.id)
    deleteBlog(blogToBeDeleted)
  }

  return (
  <div style={blogStyle}>
    <div style={infoMinimum}>
      {blog.title} - {blog.author} - <button onClick={toggleShowAllInfo}>Show more</button>
    </div>
    <div style={infoAll}>
      Title: {blog.title} <button onClick={toggleShowAllInfo}>Hide</button><br />
      Author: {blog.author} <br />
      URL: {blog.url} <br />
      Likes: {blog.likes} <button onClick={() => likeIncrement(blog)}>Like!</button> <br /> 
      User that added this blog: {blog.user.username} <br />
      <button onClick={() => blogDelete(blog)}>Delete</button>
    </div>
  </div>  
)}

export default Blog