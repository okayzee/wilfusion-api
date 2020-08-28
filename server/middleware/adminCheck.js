const jwt = require('jsonwebtoken');
const Users = require('../models').Users;
const validator = require('validator');

module.exports = (req, res, next) => {
  try {

    if(validator.isEmail(req.body.whoAreYou)) {
        Users.findOne({
            where: {
              email: req.body.whoAreYou
            }
          })
          
          //check if user is admin
          .then(users => {
            if(users.isAdmin) {
              res.locals.isAdmin = true;

              if(users.emailVerified) {
                next()
              } else {
                res.locals.isEmailVerified = false;
                res.status(401).send({
                  message: 'You\'re email is not verified but you\'re an admin. Verify your email and try again',
                  isEmailVerified: res.locals.isEmailVerified
                })
              }
              
            } else {
              res.locals.isAdmin = false;
              res.status(401).send({
                message: 'You are not an admin. Authentication failed!',
                isAdmin: res.locals.isAdmin
              })
            }

          })
          .catch(error => {
            res.status(401).send({
              message: 'Authentication failed',
              error: error
            })
          })
    } else {
        res.status(401).send({
            message: 'That does not look like a valid email address'
        })
    }
    

  } catch(e) {
    res.status(401).json({
      message: 'Caught! You are not admin. Authentication failed!',
      error: e
    });
  }
};