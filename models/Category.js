const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  post_id: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('category', CategorySchema);