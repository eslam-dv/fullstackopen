import { useState } from 'react'

import NewBlogForm from './NewBlogForm'
import Blog from './Blog'

const BlogList = ({
  blogs,
  user,
  handleLogout,
  createNewBlog,
  handleBlogDelete,
  handleBlogLike,
}) => {
  const [visible, setVisible] = useState(false)

  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <>
      <h1>blogs</h1>
      <p>
        <span>{user.name} logged in</span>
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      {visible && (
        <>
          <NewBlogForm createNewBlog={createNewBlog} />
          <br />
        </>
      )}
      <button type="button" onClick={() => setVisible(!visible)}>
        {visible ? 'cancel' : 'new blog'}
      </button>
      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            removeBlog={handleBlogDelete}
            user={user}
            likeBlog={handleBlogLike}
          />
        ))}
      </div>
    </>
  )
}

export default BlogList
