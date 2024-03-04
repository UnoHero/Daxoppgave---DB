require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const mongoose = require("mongoose")

const newUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userModel.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    console.log();
    res.status(200).json({users});
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const patchUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

const delUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await userModel.findByIdAndDelete(userId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Generate JWT token
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.signup(name, email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  newUser,
  getUsers,
  patchUser,
  delUser,
  loginUser,
  signupUser,
};
