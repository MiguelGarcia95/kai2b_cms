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

const validateEmail = email => {
  var regexString = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexString.test(email.toLowerCase());
}

// encrypt password before saving user
UserSchema.pre('save', async function(next) {
  const user = this;

  if (user.isModified || user.isNew) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.statics.validateUser = function(userData) {
  let isValid = true;
  let errors = {};

  if (!userData.password) {
    errors.password = 'Password cannot be empty.';
    isValid = false;
  } else if (userData.password.length < 5) { 
    errors.password = 'Password was not confirmed.';
    isValid = false;
  } else if (userData.password !== userData.confirm_password) {
    errors.password = 'Password was not confirmed.';
    isValid = false;
  }

  if (!userData.email) {
    errors.email = 'Email cannot be empty.';
    isValid = false;
  } else if (!validateEmail(userData.email)) {
    errors.email = 'Email is not valid.';
    isValid = false;
  }

  if (!userData.name) {
    errors.name = 'Name cannot be empty.';
    isValid = false;
  }

  return {isValid, errors}
};

UserSchema.statics.validateUserUpdate = function(userData) {
  let isValid = true;
  let errors = {};

  if (userData.password) {
    if (userData.password.length < 5) { 
      errors.password = 'Password was not confirmed.';
      isValid = false;
    } else if (userData.password !== userData.confirm_password) {
      errors.password = 'Password was not confirmed.';
      isValid = false;
    }
  } else if (userData.confirm_password) {
    errors.password = 'Cannot confirm password if password empty.';
    isValid = false;
  }

  // if (userData.description) {
  // }

  return {isValid, errors}
};


module.exports = mongoose.model('user', UserSchema);