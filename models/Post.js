const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'public'
  },
  description: {
    type: String,
    required: true
  },
  allowComments: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
});

PostSchema.statics.validatePost = function(postData) {
  let isValid = true;
  let errors = {};

  if (!postData.title) {
    errors.title = 'Title cannot be empty.';
    isValid = false;
  }

  if (!postData.category) {
    errors.category = 'Category cannot be empty.';
    isValid = false;
  }

  if (!postData.status) {
    errors.status = 'Status cannot be empty.';
    isValid = false;
  }

  if (!postData.description) {
    errors.description = 'Description cannot be empty.';
    isValid = false;
  }

  if (!postData.user) {
    errors.user = 'UserId cannot be empty.';
    isValid = false;
  }

  return {isValid, errors}
};

PostSchema.statics.validatePostUpdate = function(postData) {
  let isValid = true;
  let errors = {};

  if (!postData.title) {
    errors.title = 'Title cannot be empty.';
    isValid = false;
  }

  if (!postData.category) {
    errors.category = 'Category cannot be empty.';
    isValid = false;
  }

  if (!postData.status) {
    errors.status = 'Status cannot be empty.';
    isValid = false;
  }

  if (!postData.description) {
    errors.description = 'Description cannot be empty.';
    isValid = false;
  }

  return {isValid, errors}
};

module.exports = mongoose.model('post', PostSchema);