module.exports = {
  index: (req, res) => {
    res.render('admin/index');
  },
  
  getPosts: (req, res) => {
    res.render('admin/posts');
  },

  submitPost: (req, res) => {
    res.send('submitted post data');
  },

  createPost: (req, res) => {
    res.render('admin/createPost');
  }
}