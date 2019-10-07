const jwt = require('jsonwebtoken');

module.exports = {
  // validateToken: (req, res, next) => {
  //   const authHeader = req.headers.authorization;
  //   let result;
  //   if (authHeader) {
  //     const token = req.headers.authorization.split(' ')[1];
  //     const options = {expiresIn: '2d', issuer: 'Blog kai'};
  //     try {
  //       result = jwt.verify(token, process.env.JWT_SECRET, options);
  //       req.decoded = result;
  //     } catch (error) {
  //       res.status(401).send({error: 'Authentication error. Token invalid'})
  //     }
  //   } else {
  //     res.status(401).send({error: 'Authentication error. Token required'})
  //   }
  // }
  isUserAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  }
}