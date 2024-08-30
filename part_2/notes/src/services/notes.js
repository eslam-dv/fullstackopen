const baseUrl = "http://localhost:3001/notes";

async function getAll() {
	return fetch(baseUrl).then((response) => response.json());
}

async function create(newObject) {
	const response = await fetch("http://localhost:3001/notes", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newObject),
	});
	return await response.json();
}

async function update(id, newObject) {
	return fetch(`${baseUrl}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newObject),
	}).then((response) => response.json());
}

export default {
	getAll,
	create,
	update,
};
