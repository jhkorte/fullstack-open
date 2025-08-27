import { render, screen } from '@testing-library/react'
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

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})