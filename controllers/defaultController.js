const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

module.exports = {
  index: async (req, res) => {
    try {
      const posts = await Post.find().populate([{path:'category', select:'name'}, {path:'user', select:'avatar name'}]).sort({created_at: -1}).limit(9);
      const sliderPosts = posts.slice(0, 3);
      const popularPosts = posts.slice(0, 6);
      const user = req.user || false;
      res.render('default/index', {posts, user, sliderPosts, popularPosts});
    } catch (error) {
      req.flash('error-message', 'Could not get any posts. Try again.');
      res.redirect('back');
    }
  }, 

  getPosts: async (req, res) => {
    const limit = 10;
    const page = req.query.p ? Number(req.query.p) : 0;
    const skipOver = limit * page;
    try {
      const user = req.user || false;
      const posts = await Post.find().populate('category', 'name').skip(skipOver).sort({created_at: -1}).limit(limit);
      const count = await Post.countDocuments();
      const lastPage = count/limit > 1 ? count/limit : 1;
      const pagination = {
        back: page === 0 ? false : true,
        foward: page >= lastPage - 1 ? false : true,
        lastPage: lastPage,
        page: Number(page),
      }
      res.render('default/post/index', {posts, user, pagination});
    } catch (error) {
      req.flash('error-message', 'Could not get any posts. Try again.');
      res.redirect('/');
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate([{path:'category', select:'name'}, {path:'user', select:'avatar name'}]);
      const comments = await Comment.find({post: req.params.id}).populate('user', ['name', 'avatar']);
      const user = req.user || false;
      if (post) {
        res.render('default/post/single', {post, user, comments});
      } else {
        req.flash('error-message', 'Post does not exist.');
        res.redirect('/');
      }
    } catch (error) {
      res.redirect('/');
    }
  },

  postComment: async (req, res) => {
    req.body.post = req.params.id;
    const comment = await new Comment(req.body);
    const user = await User.findById(req.user);
    try {
      if (user) {
        await comment.save();
        res.redirect('back');
        req.flash('success-message', 'Comment posted.');
      } else {
        res.redirect('back');
        req.flash('error-message', 'Please Login.');
      }
    } catch (error) {
      req.flash('error-message', 'Could not post comment.');
      res.redirect('back');
    }
  },

  
}