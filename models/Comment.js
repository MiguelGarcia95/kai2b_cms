const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post',
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('comment', CommentSchema);