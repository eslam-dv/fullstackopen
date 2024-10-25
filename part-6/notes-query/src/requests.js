const baseUrl = "http://localhost:3001/notes";

const getNotes = () => fetch(baseUrl).then((res) => res.json());

const createNote = (content) => {
  fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  }).then((res) => res.json());
};

const updateNote = (updatedNote) => {
  fetch(`${baseUrl}/${updatedNote.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedNote),
  }).then((res) => res.json());
};

export { getNotes, createNote, updateNote };
