const Users = require('../models').Users;

const Status = require('../../constants/status');
const UserType = require('../../constants/userType');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const jwt = require('jsonwebtoken');
const validator = require('validator');

const nodemailer = require('nodemailer');
var mailerhbs = require('nodemailer-express-handlebars');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var sgTransport = require('nodemailer-sendgrid-transport');

module.exports = {
    mock(req, res) {
        return Users
            .findAll()
            .then(Users => res.status(200).send({
                users: Users,
                success: 'Mocking Test!'
            }))
            .catch(error => res.status(400).send(error));
    },

    emailTest(req, res) {
        
        const msg = {
            to: 'richardoluwo50@gmail.com',
            from: 'afolabioluwo50@gmail.com',
            subject: 'Welcome to Grocery',
            html: `<div align="center">
            <h2>Welcome to Kliine</h2>
            <p>Use this link to verify your email: ${req.headers.host}/api/verify-email/${token}</p>
            </div>`
        };

        sgMail.send(msg).then(() => {
            console.log('Message sent')

            res.status(200).send({
                success: 'Email sent!'
            })
        }).catch((error) => {
            console.log(error.response.body)
            res.status(400).send({
                error: error.response.body
            })
        })  

        
    },

    register(req, res, next) {
        return Users
            .findOrCreate({
                where: {
                    email: req.body.email
                },
                defaults: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    email: req.body.email,
                    emailVerified: new Date(),
                    status: Status.active,
                    userType: UserType.regular,
                    password: bcrypt.hashSync(req.body.password, salt) 
                }
            }).spread((user, created) => {
                if(created) {
                    const token = jwt.sign({
                        data: req.body.email
                      }, process.env.JWT_SECRET , { expiresIn: '1h' });

                      const msg = {
                        to: req.body.email,
                        from: 'afolabioluwo50@gmail.com',
                        subject: 'Welcome to Grocery',
                        html: `<div align="center">
                        <h2>Welcome to Kliine</h2>
                        <p>Use this link to verify your email: ${req.headers.host}/api/verify-email/${token}</p>
                        </div>`
                    };
            
                    sgMail.send(msg).then(() => {
                        console.log('Message sent')
            
                    }).catch((error) => {
                        console.log(error.response.body)
                        res.status(400).send({
                            error: error.response.body
                        })
                    }) 

                    res.status(200).send({
                        success: 'User created successfully',
                        token: token,
                        user: user,
                        created: created
                    })
                } else {
                    res.status(400).send({
                        error: 'User with that email already exists',
                        created: created
                    })
                }
            })
        .catch(error =>  {
            console.log('Errors: ', error)
            res.status(400).send(error)
        });
    },

    login(req, res, next) {
        return Users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) {
                    return res.status(401).send({
                        error: 'Something terrible went wrong'
                    })
                } else if(result) {
                    const token = jwt.sign({
                        data: user.email
                      }, process.env.JWT_SECRET , { expiresIn: '1h' });

                      res.locals.userLogin = user;
                      res.locals.loginToken = token;

                      next();
                    
                } else if(!result) {
                    return res.status(401).send({
                        error: 'Password incorrect',
                        user: result
                    })
                }
            })
        })
        .catch(error => res.status(400).send({
            error: 'Could not find user with that email'
        }));
    },

    //Verify user email
    verifyEmail(req, res, next) {
        return Users.update({
                emailVerified: true
            }, {
                where: {
                    email: res.locals.decodedToken
                }
            })
            .then(user => {
                res.status(201).send({
                    success: "Email has been verified",
                    user: user
                })
            })
            .catch(error => res.status(400).send({ error: error }));
    },

    //Forgot Password
    forgotPassword(req, res, next) {
        return Users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(users => {
            const token = jwt.sign({
                data: req.body.email
              }, process.env.JWT_SECRET , { expiresIn: '1h' });
              
              const msg = {
                to: req.body.email,
                from: 'afolabioluwo50@gmail.com',
                subject: 'Kliine Password Reset',
                html: `<div align="center">
                <h2>Reset Password</h2>
                <p>Use this link to verify your email: ${req.headers.host}/api/reset-password/${token}</p>
                <p>If you did not make this request you do not have to do anything or contact us incase your account may have been compromised</p>
                </div>`,
            };

              sgMail.send(msg).then(() => {
                console.log('Message sent')
            }).catch((error) => {
                console.log(error.response.body)
                res.status(400).send({
                    error: error.response.body
                })
            })
    
            res.status(200).send({
                success: 'Password reset email sent',
                toEmail: req.body.email
            })    
        })
        .catch(error => res.status(400).send({
            error: 'Could not find user with that email' + error 
        }));
    },

    //Reset user password
    resetPassword(req, res, next) {
        return Users.update({
                resetToken: req.params.token,
                password: req.body.password
            }, {
                where: {
                    email: res.locals.decodedToken
                }
            })
            .then(user => {
                res.status(201).send({
                    success: "Password has been reset",
                    user: user
                })
            })
            .catch(error => res.status(400).send({error: error}));
    },

    //Delete user from DB
    destroy(req, res, next) {
        return Users.destroy({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            res.status(200).send({
                success: 'User deleted!',
                user: user, //Returns number of users deleted
                isAdmin: res.locals.isAdmin
            })
        })
        .catch(error => res.status(400).send({error: error}));
    },
}