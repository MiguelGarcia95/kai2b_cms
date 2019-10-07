const Category = require('../../models/Category');
const Post = require('../../models/Post');

module.exports = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      const user = req.user || false;
      res.render('default/category/index', {categories, user});
    } catch (error) {
      req.flash('error-message', 'Could not get any categories. Try again.');
      res.redirect('/');
    }
  },
  
  getCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      const posts = await Post.find({category: req.params.id});
      const user = req.user || false;
      res.render('default/category/single', {category, posts, user});
    } catch (error) {
      req.flash('error-message', 'Could not get any posts. Try again.');
      res.redirect('/categories');
    }
  },
}