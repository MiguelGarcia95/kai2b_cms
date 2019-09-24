module.exports = {
  index: (req, res) => {
    res.render('admin/index');
  },
  
  getPosts: (req, res) => {
    res.render('admin/post/index');
  },

  submitPost: (req, res) => {
    res.send('submitted post data');
  },

  createPost: (req, res) => {
    res.render('admin/post/create');
  }
}