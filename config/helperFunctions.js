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
    if (privilege == 'user') return false;

    if (privilege == 'subadmin') {
      if (equalTo == 'user') {
        return true;
      } else {
        return false;
      }
    }

    if (privilege == 'admin') {
      if (equalTo == 'admin') {
        return false;
      } else {
        return true;
      }
    }
  },

  isUser: (currentUserId, id) => String(currentUserId) === String(id),

  addNumber: num => num += 1,

  subNumber: num => num -= 1,

  convertTime: function(time) {
    return moment(time).format("MMMM Do YYYY, h:mm a")
  },
}