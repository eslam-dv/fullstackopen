import { useDispatch, useSelector } from "react-redux";

import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes.js";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();

  const notes = useSelector(({ filter, notes }) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((n) => n.important)
      : notes.filter((n) => !n.important);
  });

  const handleClick = async (id) => {
    dispatch(toggleImportanceOf(id));
    await noteService.toggleImportance(id);
  };

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => handleClick(note.id)}
        />
      ))}
    </ul>
  );
};

export default Notes;
