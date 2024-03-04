require("dotenv").config({ path: "../.env" });
const User = require('../models/user');
const bcrypt = require('bcrypt');

const userHandler = {
  createUser: async (userData) => {
    try {
      const saltRounds = parseInt(process.env.SALT);
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword
      });
      return await user.save();
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (userId) => {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (userId, userData) => {
    try {
      return await User.findByIdAndUpdate(userId, userData, { new: true });
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (userId) => {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = userHandler;
