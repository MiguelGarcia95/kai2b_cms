const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/users');

router.route('/users').get(userController.getUsers);

router.route('/users/:id/privileges').put(userController.updateUserPrivileges);

router.route('/users/edit/:id')
  .get(userController.editUser)
  .post(userController.updateUser);

router.route('/users/delete/:id').delete(userController.deleteUser);


module.exports = router;  
