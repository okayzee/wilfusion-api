const jwt = require('jsonwebtoken');
const validator = require('validator');

module.exports = (req, res, next) => {
    if(req.params.token) {     
        try {
            const token = req.params.token;
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

                if(err) {
                    res.status(401).send({
                        error: err
                    })
                } else {
                    res.locals.decodedToken = decoded.data;
                   next()
                }
                
            });
          } catch {
              res.status(401).send({
                error: 'Invalid request!'
              });
          }
    } else {
        return res.status(400).send({error: 'No token found'});
    }
};