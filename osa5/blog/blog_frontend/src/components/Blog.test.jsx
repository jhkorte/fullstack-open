import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'BlogTester',
    url: 'test.com',
    user: {
      username: 'jakessu',
      name: 'Jaakko Hyvönen',
      id: '68a330ffc8703e58bb876b43'
    }
  }

  render(<Blog blog={blog} />)

  const elements = screen.getAllByText('Component testing is done with react-testing-library', { exact: false })
  expect(elements).toBeDefined()
  expect(elements).toHaveLength(2) // 2, because it is rendered both before and after clicking the button
})


test('renders more blog info ONLY after button press', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'BlogTester',
    url: 'test.com',
    user: {
      username: 'jakessu',
      name: 'Jaakko Hyvönen',
      id: '68a330ffc8703e58bb876b43'
    }
  }

  render(<Blog blog={blog} />)

  const elements = screen.getAllByText('Component testing is done with react-testing-library', { exact: false })
  expect(elements).toBeDefined()
  expect(elements).toHaveLength(2) // 2, because it is rendered both before and after clicking the button

  const elementLikes = screen.getAllByText('Likes', { exact: false })
  expect(elementLikes).toHaveLength(1) // If this has length 1, that means it was only rendered in one of the two cases, i.e. the one when the 'show more' button was already clicekd

  const elementURL = screen.getAllByText('URL', { exact: false })
  expect(elementURL).toHaveLength(1) // Same here
})


test('testing like button function call functionality by clicking like button twice', async () => {
  const user = userEvent.setup()
  const updateBlog = vi.fn()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'BlogTester',
    url: 'test.com',
    user: {
      username: 'jakessu',
      name: 'Jaakko Hyvönen',
      id: '68a330ffc8703e58bb876b43'
    }
  }

  render(<Blog blog={blog} updateBlog={updateBlog} />)

  const likeButton = screen.getByText('Like!')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(updateBlog.mock.calls).toHaveLength(2)

})