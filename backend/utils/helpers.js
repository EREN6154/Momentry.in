import jwt from "jsonwebtoken";

export const generateToken = (id, email, isAdmin) => {
  return jwt.sign({ id, email, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const hashPassword = async (password) => {
  const bcrypt = require("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hash) => {
  const bcrypt = require("bcryptjs");
  return bcrypt.compare(password, hash);
};
