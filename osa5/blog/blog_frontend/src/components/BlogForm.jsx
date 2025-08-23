const BlogForm = ({
  addBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl,
}) => {
  return (
    <div>
			<h2>Create new Blog</h2>
			<form onSubmit={addBlog}>
					<div>
						title
							<input
								type="text"
								value={newBlogTitle}
								name="Title"
								onChange={handleTitleChange}
							/>
					</div>
					<div>
						author
							<input
								type="text"
								value={newBlogAuthor}
								name="Author"
								onChange={handleAuthorChange}
							/>
					</div>
					<div>
						url
							<input
								type="text"
								value={newBlogUrl}
								name="URL"
								onChange={handleUrlChange}
							/>
					</div>
					<button type="submit">Submit</button>
				</form>
		</div>
  )
}

export default BlogForm