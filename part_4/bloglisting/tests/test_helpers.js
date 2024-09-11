import BlogModel from "../models/blog.js";

const initialBlogs = [
  {
    _id: "66dc05e94254e631700f9ea3",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "66e19f1440fd8861c1f57182",
  },
  {
    _id: "66dc05e94254e631700f9ea4",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: "66e19f1440fd8861c1f57182",
  },
  {
    _id: "66dc05e94254e631700f9ea5",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: "66e19f1440fd8861c1f57182",
  },
  {
    _id: "66dc05e94254e631700f9ea6",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: "66e19f1440fd8861c1f57182",
  },
  {
    _id: "66dc05e94254e631700f9ea7",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user: "66e19f1440fd8861c1f57182",
  },
  {
    _id: "66dc05e94254e631700f9ea8",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    user: "66e19f1440fd8861c1f57182",
  },
];

const blogsInDb = async () => {
  const blogs = await BlogModel.find({});
  return blogs.map((blog) => blog.toJSON());
};

export { blogsInDb, initialBlogs };
