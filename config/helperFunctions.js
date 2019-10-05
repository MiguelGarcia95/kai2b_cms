const moment = require('moment');

module.exports = {
  select: function(status, options) {
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

  isAdmin: function(privilege, equalTo)  {
    // return privilege === 'admin' ? true : false
    console.log(privilege)
    console.log(equalTo)
  },

  addNumber: num => num += 1,

  subNumber: num => num -= 1,

  convertTime: function(time) {
    return moment(time).format("MMMM Do YYYY, h:mm a")
  },

  isUserAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  }
}