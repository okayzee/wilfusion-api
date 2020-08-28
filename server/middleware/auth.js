const jwt = require('jsonwebtoken');
const Users = require('../models').Users;
const validator = require('validator');

module.exports = (req, res, next) => {
  try {

    if(req.headers.authorization) {

      res.status(200).send({
        success: req.headers
      })
      
    }
    
    
    // if(validator.isEmail(req.body.email)) {
    //   Users.findOne({
    //     where: {
    //       email: req.body.email
    //     }
    //   })
    //   //check if email is verified
    //   .then(users => {
    //     if(users.emailVerified) {
    //       res.locals.isEmailVerified = true;
    //       next()
    //     } else {
    //       res.locals.isEmailVerified = false;
    //       res.status(401).send({
    //         message: 'Authentication failed',
    //         isEmailVerified: res.locals.isEmailVerified
    //       })
    //     }  
    //   })
    //   .catch(error => {
    //     res.status(401).send({
    //       message: 'Authentication failed'
    //     })
    //   })
    // } else {
    //   res.status(401).send({
    //     message: 'That does not look like a valid email address'
    //   })
    // }

  } catch(e) {
    res.status(401).json({
      error: e
    });
  }
};