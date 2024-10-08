import { test, describe } from "node:test";
import assert from "node:assert";

import {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
} from "../utils/list_helpers.js";

const listWithOneBlog = [
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
		likes: 5,
		__v: 0,
	},
];

const blogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0,
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0,
	},
];

// dummy test
test("dummy returns one", () => {
	const blogs = [];
	const result = dummy(blogs);
	assert.strictEqual(result, 1);
});

// total likes test
describe("total likes", () => {
	test("of empty list is zero", () => {
		const result = totalLikes([]);
		assert.strictEqual(result, 0);
	});

	test("when list only has one blog, equals the likes of that", () => {
		const result = totalLikes(listWithOneBlog);
		assert.strictEqual(result, 5);
	});

	test("of bigger list is calculated right", () => {
		const result = totalLikes(blogs);
		assert.strictEqual(result, 36);
	});
});

// blog with most likes test
describe("favorite blog", () => {
	test("of empty list is null", () => {
		const result = favoriteBlog([]);
		assert.strictEqual(result, null);
	});

	test("when list only has one blog, then it's the favorite", () => {
		const result = favoriteBlog(listWithOneBlog);
		assert.deepStrictEqual(result, listWithOneBlog[0]);
	});
	test("of bigger list is the blog with most likes", () => {
		const result = favoriteBlog(blogs);
		assert.deepStrictEqual(result, blogs[2]);
	});
});

// author wiht most blogs test
describe("author with most blogs", () => {
	test("of empty list is null", () => {
		const result = mostBlogs([]);
		assert.strictEqual(result, null);
	});

	test("of list with one blog is the author of that blog", () => {
		const result = mostBlogs(listWithOneBlog);
		assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 1 });
	});

	test("of list with many blogs is the author with most blogs", () => {
		const result = mostBlogs(blogs);
		assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
	});
});

// author with most likes test
describe("author with most likes", () => {
	test("of empty list is null", () => {
		const result = mostLikes([]);
		assert.strictEqual(result, null);
	});

	test("of list with one blog is the author of that blog", () => {
		const result = mostLikes(listWithOneBlog);
		assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 5 });
	});

	test("of list with many blogs is the author with most likes", () => {
		const result = mostLikes(blogs);
		assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 });
	});
});
