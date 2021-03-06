const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
});

module.exports = mongoose.model('category', CategorySchema);