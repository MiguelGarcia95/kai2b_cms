const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
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
    ref: 'user'
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: 'category'
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ],
});

module.exports = mongoose.model('post', PostSchema);