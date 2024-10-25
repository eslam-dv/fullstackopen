const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const res = await fetch(baseUrl);
  const data = await res.json();
  return data;
};

const createNew = async (content) => {
  const object = { content, important: false };
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });
  return res.json();
};

const toggleImportance = async (id) => {
  const note = await fetch(`${baseUrl}/${id}`).then((res) => res.json());
  const changedNote = { ...note, important: !note.important };
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(changedNote),
  });
  return res.json();
};

export default { getAll, createNew, toggleImportance};
