const jwt = require('jsonwebtoken');
const Users = require('../models').Users;
const validator = require('validator');

module.exports = (req, res, next) => {
  try {

    if (validator.isEmail(req.body.email)) 
      next()
    else
        res.status(401).send({
            error: 'That does not look like a valid email'
        })
  } catch(e) {
    console.log('Not receiving request', req.body.email)
    res.status(401).json({
      error: e
    });
  }
};