const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require("validator");
require("dotenv").config({ path: "../../.env" });

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: 'Password must be strong',
    },
  },
});

// static signup method
userSchema.statics.signup = async function(name, email, password) {

  // validation
  if (!name || !email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough')
    }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = parseInt(process.env.SALT);
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ name, email, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function (name, email, password) {
  
if (!name || !email || !password) {
    throw Error('All fields must be filled')
}

const user = await this.findOne({ email })

if (!user) {
    throw Error("Incorrect email")
}

const match = await bcrypt.compare(password, user.password)

if (!match) {
    throw Error("Incorrect Password")
}

if (user.name !== name) {
    throw Error("Incorrect name")
}

return user
}


module.exports = mongoose.model('User', userSchema)