const baseUrl = "/api/blogs";

let token = "";

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getBlogs = async () => {
  const response = await fetch(baseUrl);
  return await response.json();
};

const createBlog = async (blog) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(blog),
  });
  return await response.json();
};

const removeBlog = async (blogId) => {
  await fetch(`${baseUrl}/${blogId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });
};

const updateBlog = async (blogId, newBlog) => {
  const response = await fetch(`${baseUrl}/${blogId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(newBlog),
  });
  return await response.json();
};

export { getBlogs, createBlog, removeBlog, updateBlog, setToken };
