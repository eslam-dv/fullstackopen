import _ from "lodash";

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (sum, blog) => {
		return sum + blog.likes;
	};
	return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}
	let favorite = blogs[0];

	for (let i = 0; i < blogs.length; i++) {
		if (blogs[i].likes > favorite.likes) {
			favorite = blogs[i];
		}
	}

	return favorite;
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	const authorCounts = _.countBy(blogs, "author");
	const authorBlogsArray = _.map(authorCounts, (blogs, author) => ({
		author,
		blogs,
	}));
	const mostBlogsAuthor = _.maxBy(authorBlogsArray, "blogs");

	return mostBlogsAuthor;
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	const authorsBlogs = _.groupBy(blogs, "author");
	for (let author in authorsBlogs) {
		authorsBlogs[author] = _.sumBy(authorsBlogs[author], "likes");
	}
	const authorLikesArray = _.map(authorsBlogs, (likes, author) => ({
		author,
		likes,
	}));
	const mostLikesAuthor = _.maxBy(authorLikesArray, "likes");
	return mostLikesAuthor;
};

export { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
