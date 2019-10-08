const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
  privilege: {
    type: String,
    default: 'user',
    trim: true
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

UserSchema.statics.validateUser = function(userData) {
  if (userData.password !== userData.confirm_password) {
    console.log('password confirmation wrong');
    // return false;
  }
  console.log(userData)
};


module.exports = mongoose.model('user', UserSchema);