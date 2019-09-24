module.exports = {
  index: (req, res) => {
    res.render('admin/index');
  },
  
  posts: (req, res) => {
    res.render('admin/posts');
  }
}