module.exports = {
  selectOption: function(status, options) {
    return options.fn(this).replace(new RegExp('value=\"'+status+'\"'), '$&selected="selected"');
  },

  isEmpty: function(obj) {
    for(let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  },

  isUserAuthenticated: (req, res, next) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  }
}