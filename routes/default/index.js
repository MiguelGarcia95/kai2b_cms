const express = require('express');
const router = express.Router();

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'default';
  next();
})

router.use('/', require('./posts'));
router.use('/', require('./comments'));
router.use('/', require('./users'));
router.use('/', require('./categories'));

module.exports = router;  

