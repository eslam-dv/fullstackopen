import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from '../components/Blog'

describe('<Blog />', () => {
  test('Blog renders title and author but not likes or url', () => {
    const blog = {
      title: 'test blog component',
      author: 'eslam',
      likes: 10,
      url: 'test.com',
    }

    const { container } = render(<Blog blog={blog} />)
    const title = container.querySelector('.blog-title')
    const author = container.querySelector('.blog-author')
    const likes = container.querySelector('.blog-likes')
    const url = container.querySelector('.blog-url')
    expect(title).toHaveTextContent('test blog component')
    expect(author).toHaveTextContent('eslam')
    expect(likes).toBeNull()
    expect(url).toBeNull()
  })

  test('Blog renders likes and url when show button is clicked', async () => {
    const user = userEvent.setup()
    const blog = {
      title: 'test blog component',
      author: 'eslam',
      likes: 10,
      url: 'test.com',
      user: {
        username: 'eslam',
      },
    }
    const blogUser = {
      username: 'eslam',
    }

    const { container } = render(<Blog blog={blog} user={blogUser} />)
    const button = container.querySelector('.view')

    await user.click(button)
    const likes = container.querySelector('.blog-likes')
    const url = container.querySelector('.blog-url')

    expect(likes).toHaveTextContent('10')
    expect(url).toHaveTextContent('test.com')
  })

  test('When like button is pressed twice the event handler is called twice', async () => {
    const user = userEvent.setup()
    const blog = {
      title: 'test blog component',
      author: 'eslam',
      likes: 10,
      url: 'test.com',
      user: {
        username: 'eslam',
      },
    }
    const blogUser = {
      username: 'eslam',
    }

    const mockHandler = vi.fn()

    const { container } = render(
      <Blog blog={blog} user={blogUser} likeBlog={mockHandler} />,
    )

    const viewButton = container.querySelector('.view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(1)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })


})
