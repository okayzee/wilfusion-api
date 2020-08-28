const jwt = require('jsonwebtoken');
const validator = require('validator');

module.exports = (req, res, next) => {
    if(req.body.email && req.body.password) {  

        try {
            if(validator.isEmail(req.body.email)) {
                if(validator.isLength(req.body.password, {min: 2, max: 64})) {
                    next()
                } else {
                    res.status(400).send({
                        error: 'That does not look like a valid password'
                    })
                }       
            } else {
                res.status(400).send({
                    error: 'That does not look like an email address'
                })
            }
                
        } catch(e) {
            res.status(400).send({
                error: e
            })
        }
        

    } else {
        return res.status(400).send({
            error: 'Email or password cannot be empty'
        });
    }
};