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
  console.log(postData)
};

module.exports = mongoose.model('post', PostSchema);