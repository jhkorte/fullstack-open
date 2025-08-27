import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('<BlogForm /> updates its parent state and calls onSubmit correctly', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog} />)

    const inputBlogTitle = screen.getByPlaceholderText('Blog title here...')
    const inputBlogAuthor = screen.getByPlaceholderText('Blog author here...')
    const inputBlogURL = screen.getByPlaceholderText('Blog URL here...')
    const submitButton = screen.getByText('Submit')

    await user.type(inputBlogTitle, 'testing BlogForm')
    await user.type(inputBlogAuthor, 'Bloggy McTester')
    await user.type(inputBlogURL, 'testblogs.com')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog).toHaveBeenCalledWith({
      title: 'testing BlogForm',
      author: 'Bloggy McTester',
      url: 'testblogs.com'
    })
  })
})