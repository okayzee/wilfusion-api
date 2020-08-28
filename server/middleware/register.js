const jwt = require('jsonwebtoken');
const validator = require('validator');

module.exports = (req, res, next) => {
    if(req.body.firstName && req.body.lastName && req.body.email && req.body.phone && req.body.password) {  

        try {
            if(validator.isEmail(req.body.email) && validator.isLength(req.body.password, {min: 6, max: 64}) 
              && validator.isLength(req.body.firstName, {min: 2, max: 64}) && validator.isLength(req.body.lastName, {min: 2, max: 64})
              && validator.isMobilePhone(req.body.phone, 'en-NG')) {
                next()
                }     
             else {
                res.status(400).send({
                    error: 'One or two fields do not meet our requirements'
                })
            }
                
        } catch(e) {
            res.status(400).send({
                error: e
            })
        }
        

    } else {
        return res.status(400).send({
            error: 'Some fields cannot be empty'
        });
    }
};