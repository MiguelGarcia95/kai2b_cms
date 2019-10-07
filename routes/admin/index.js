const express = require('express');
const router = express.Router();
const {isUserAuthenticated} = require('../../config/helperFunctions');

router.all('/*', isUserAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'admin';
  next();
});

router.use('/', require('./posts'));
router.use('/', require('./comments'));
router.use('/', require('./users'));
router.use('/', require('./categories'));

module.exports = router;  

