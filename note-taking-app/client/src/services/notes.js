const baseUrl = 'http://localhost:3001/api/notes'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

async function getAll() {
  const response = await fetch(baseUrl)
  const data = await response.json()
  return data
}

async function create(newObject) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(newObject),
  })
  const data = await response.json()
  return data
}

async function update(id, newObject) {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newObject),
  })
  const data = await response.json()
  return data
}

export { getAll, create, update, setToken }
