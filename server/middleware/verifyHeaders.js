const jwt = require('jsonwebtoken');
const validator = require('validator');

module.exports = (req, res, next) => {

    if(req.headers.authorization) {     
        try {
            const token = req.headers.authorization;
            
            const authorization = token.split(' ');

            jwt.verify(authorization[1], process.env.JWT_SECRET, (err, decoded) => {

                if(err) {
                    res.status(401).send({
                        error: err
                    })
                } else {
                    res.locals.decodedHeaders = decoded.data;
                    // console.log(res.locals.decodedHeaders)
                   next()
                }
                
            });
          } catch(e) {
              return res.status(401).send({
                error: 'Invalid request!'
              });
          }
    } else {
        return res.status(400).send({error: 'Authorization token not set'});
    }

};