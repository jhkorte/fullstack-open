import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)

  const infoMinimum = { display: showAllInfo ? 'none' : '' }
  const infoAll = { display: showAllInfo ? '' : 'none' }

  const toggleShowAllInfo = () => {
    setShowAllInfo(!showAllInfo)
  }

  return (
  <div>
    <div style={infoMinimum}>
      {blog.title} - {blog.author} - <button onClick={toggleShowAllInfo}>Show more</button>
    </div>
    <div style={infoAll}>
      {blog.title} <br />
      {blog.author} <br />
      {blog.url} <br />
      {blog.likes} <br /> 
      <button onClick={toggleShowAllInfo}>Hide</button>
    </div>
  </div>  
)}

export default Blog