const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'default';
  next();
})

router.route('/').get(defaultController.index);



module.exports = router;  