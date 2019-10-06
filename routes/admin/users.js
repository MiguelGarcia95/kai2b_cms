const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/users');
const {isUserAuthenticated} = require('../../config/helperFunctions');

router.all('/*', isUserAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
})

router.route('/users').get(userController.getUsers);

router.route('/users/:id/privileges').put(userController.updateUserPrivileges);

router.route('/users/edit/:id')
  .get(userController.editUser)
  .post(userController.updateUser);

module.exports = router;  
