const baseUrl = "http://localhost:3002/anecdotes";

const getAll = async () => {
  const res = await fetch(baseUrl);
  return res.json();
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });
  return res.json();
};

const vote = async (id) => {
  const anecdote = await fetch(`${baseUrl}/${id}`).then((res) => res.json());
  const object = { ...anecdote, votes: anecdote.votes + 1 };
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });
  return res.json();
};

export default { getAll, createNew, vote };
