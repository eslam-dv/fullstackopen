const baseUrl = "/api/login";

const userLogin = async (credentials) => {
	const response = await fetch(baseUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	return await response.json();
};

export { userLogin };
