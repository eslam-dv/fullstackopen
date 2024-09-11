import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const PORT = process.env.PORT || 3003;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const createToken = (user) => {
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.SECRET,
    {
      expiresIn: "7d",
    },
  );
  return token;
};

export { PORT, MONGODB_URI, createToken };
