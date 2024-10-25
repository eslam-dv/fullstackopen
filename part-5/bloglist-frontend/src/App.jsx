import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm.jsx'
import BlogList from './components/BlogList.jsx'
import { userLogin } from './services/login.js'
import { getBlogs, setToken, createBlog, removeBlog } from './services/blogs.js'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await getBlogs()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await userLogin({ username, password })
      if (user.error) {
        throw new Error(user.error)
      }
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setToken(user.token)
      setNotification({ msg: `Welcome ${user.name}`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (err) {
      console.error(err)
      setNotification({ msg: err.message, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    setToken('')
    setNotification({ msg: `Bye ${user.name}`, type: 'success' })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const createNewBlog = async (title, url) => {
    const blog = { title, url }
    try {
      const newBlog = await createBlog(blog)
      setBlogs(blogs.concat(newBlog))
      setNotification({
        msg: `a new blog ${blog.title} by ${blog.author} added`,
        type: 'success',
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (err) {
      console.error(err)
      setNotification({ msg: err.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleBlogDelete = async (blogId) => {
    try {
      await removeBlog(blogId)
      setBlogs(blogs.filter((blog) => blog.id !== blogId))
    } catch (err) {
      console.error(err)
    }
  }

  const handleBlogLike = async (blogId, updatedBlog) => {
    try {
      await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      })
    } catch (err) {
      console.error(err)
    }
  }

  const notify = ({ msg, type }) => {
    return (
      <div>
        <p
          className="notification"
          style={{
            color: type === 'error' ? 'red' : 'green',
          }}
        >
          {msg}
        </p>
      </div>
    )
  }

  return (
    <>
      {notification &&
        notify({ msg: notification.msg, type: notification.type })}
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <BlogList
          user={user}
          blogs={blogs}
          handleLogout={handleLogout}
          createNewBlog={createNewBlog}
          handleBlogDelete={handleBlogDelete}
          handleBlogLike={handleBlogLike}
        />
      )}
    </>
  )
}

export default App
