const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  post_id: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('comment', CommentSchema);