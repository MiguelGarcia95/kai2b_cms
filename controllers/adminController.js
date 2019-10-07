const Post = require('../models/Post');

module.exports = {
  index: async (req, res) => {
    const user = req.user || false;
    const posts = await Post.find().populate('user', ['name', 'avatar']).sort({created_at: -1}).limit(10);
    res.render('admin/index', {user, posts});
  },

}