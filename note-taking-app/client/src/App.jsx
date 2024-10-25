import { useState, useEffect, useRef } from 'react'

import { getAll, create, update, setToken } from './services/notes.js'
import { login } from './services/login.js'
import Note from './components/Note'
import Notification from './components/Notification'
import Togglable from './components/Togglable.jsx'
import LoginForm from './components/LoginForm.jsx'
import NoteForm from './components/NoteForm.jsx'

const Footer = () => {
  const footerStyle = { color: 'green', fontStyle: 'italic', fontSize: 16 }
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2024
      </em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errMsg, setErrMsg] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((_) => {
        setErrMsg(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrMsg(null)
        }, 5000)
        setNotes(notes.filter((note) => note.id !== id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const handleLogin = async (username, password) => {
    try {
      const user = await login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUser(user)
      setToken(user.token)
    } catch (err) {
      console.error(err)
      setErrMsg('Wrong credentials')
      setTimeout(() => {
        setErrMsg(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setToken(null)
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  )

  const noteFormRef = useRef()

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errMsg} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <p>"{user.name}" logged-in</p>
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </div>
          {noteForm()}
        </div>
      )}
      <div>
        <button type="button" onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App
