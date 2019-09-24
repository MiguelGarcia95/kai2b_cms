const Post = require('../models/Post');

module.exports = {
  index: (req, res) => {
    res.render('admin/index');
  },
  
  getPosts: (req, res) => {
    res.render('admin/post/index');
  },

  submitPost: (req, res) => {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    });
    console.log(req.body.comments);
    newPost.save().then(post => {
      console.log(post);
      req.flash('success-message', 'Post created Successfully');
      res.redirect('/admin/posts');
    });


    // res.send('submitted post data');
  },

  createPost: (req, res) => {
    res.render('admin/post/create');
  }
}