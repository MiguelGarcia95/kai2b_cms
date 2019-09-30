const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  avatar: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

// encrypt password before saving user
UserSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified || user.isNew) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model('user', UserSchema);