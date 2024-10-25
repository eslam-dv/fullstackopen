import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true,
    })
    setNewNote('')
  }

  return (
    <>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={({ target }) => {
            setNewNote(target.value)
          }}
          placeholder='write a note'
        />
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default NoteForm
