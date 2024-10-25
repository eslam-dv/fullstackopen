import { useState } from 'react'

const Blog = ({ blog, removeBlog, user, likeBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async () => {
    setLikes(likes + 1)
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
    }
    await likeBlog(blog.id, updatedBlog)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div className="blog">
      <div>
        <p className="blog-title">{blog.title}</p>
        <div className="blog-author">{blog.author}</div>
        <button
          className="view"
          type="button"
          onClick={() => setVisible(!visible)}
        >
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <>
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
            likes {likes}
            <button type="button" onClick={handleLike}>
              like
            </button>
          </div>
          {blog.user.username === user.username && (
            <button type="button" onClick={deleteBlog}>
              remove
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
