import { useState } from 'react'


const Blog = ({ blog, updateBlog }) => {
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
    /*
    console.log('liking blog with id', blog.id)
    
    const updatedBlog = {...blog, likes: blog.likes +1}
    const res = await blogService.update(blog.id, updatedBlog)
    
    console.log(res)
    */
    console.log('updating from blog.jsx')
    updateBlog(blogToBeUpdated)
  }

  return (
  <div style={blogStyle}>
    <div style={infoMinimum}>
      {blog.title} - {blog.author} - <button onClick={toggleShowAllInfo}>Show more</button>
    </div>
    <div style={infoAll}>
      Title: {blog.title} - <button onClick={toggleShowAllInfo}>Hide</button><br />
      Author: {blog.author} <br />
      URL: {blog.url} <br />
      Likes: {blog.likes} <button onClick={() => likeIncrement(blog)}>Like!</button> <br /> 
    </div>
  </div>  
)}

export default Blog