const jwt = require('jsonwebtoken');
const validator = require('validator');

module.exports = (req, res, next) => {
    try {

        res.header('Authorization', 'Bearer ' + res.locals.loginToken)

        return res.status(200).send({
            success: 'Logged in',
            user: res.locals.userLogin
        })

    } catch(e) {
        return res.status(401).send({
            error: e
        })
    }
};