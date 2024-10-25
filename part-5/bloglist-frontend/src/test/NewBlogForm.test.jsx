import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import NewBlogForm from '../components/NewBlogForm'

describe('<NewBlogForm />', async () => {
  test('NewBlogForm calls the event handler it receives as props with the right details when a new blog is created', async () => {
    const createNewBlog = vi.fn()
    const user = userEvent.setup()

    render(<NewBlogForm createNewBlog={createNewBlog} />)

    const titleInput = screen.getByPlaceholderText('blog title')
    const urlInput = screen.getByPlaceholderText('blog url')
    const button = screen.getByText('create')

    await user.type(titleInput, 'test title')
    await user.type(urlInput, 'test url')
    await user.click(button)

    expect(createNewBlog).toBeCalledWith('test title', 'test url')
  })
})
