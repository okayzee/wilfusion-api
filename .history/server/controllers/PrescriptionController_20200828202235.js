const Users = require('../models').Users;
const Prescription = require('../models').Prescription;
const Status = require('../../constants/status');

module.exports = {
    mock(req, res) {
        return Prescription
            .findAll()
            .then(prescription => res.status(200).send({
                users: prescription,
                success: 'Mocking Test!'
            }))
            .catch(error => res.status(400).send(error));
    },

    async create(req, res) {
        const {name, formula, duration} = req.body

        await Users
            .findOne({
                where: {
                    email: res.locals.decodedToken
                }
            }).then((user) => {
                Prescription
                    .create({
                        name,
                        formula,
                        status: Status.unverified,
                        userId: user.id,
                        duration
                    })
                    .then((prescription) => {
                        res.status(200).send({
                            success: 'Prescription added (drug usage not verified)',
                            prescription: prescription
                        })
                    })
                    .catch((err) => {
                        res.status(400).send({
                            err: err
                        })
                    })
            })
            .catch(error => res.status(400).send(error));
    },

    async updatePrescription(req, res, next) {
        await Users
            .findOne({
                where: {
                    email: res.locals.decodedToken
                }
            }).then((user) => {
                const updateValues = req.body;
                Prescription
                    .update(updateValues, {
                        where: {
                            userId: user.id
                        }
                    })
                    .then((prescription) => {
                        res.status(200).send({
                            success: 'Prescription updated',
                            prescription: prescription
                        })
                    })
                    .catch((err) => {
                        res.status(400).send({
                            err: err
                        })
                    })
            })
            .catch(error => res.status(400).send(error));
    },

    async verifyPrescription(req, res) {
        await Users
            .findOne({
                where: {
                    email: res.locals.decodedToken
                }
            }).then((user) => {
                Prescription
                    .findOne({
                        where: {
                            status: Status.verified
                        }
                    })
                    .then((prescription) => {
                        res.status(200).send({
                            success: 'Prescription verified',
                            prescription: prescription
                        })
                    })
                    .catch((err) => {
                        res.status(400).send({
                            err: err
                        })
                    })
            })
            .catch(error => res.status(400).send(error));
    },

    async prescriptionReminder(req, res) {
        await Users
            .findOne({
                where: {
                    email: res.locals.decodedToken
                }
            }).then((user) => {
                Prescription
                    .findOne({
                        where: {
                            userId: user.id
                        }
                    })
                    .then((prescription) => {

                        const msg = {
                            to: user.email,
                            from: 'hello@playground.com.ng',
                            subject: 'Prescription Reminder Email',
                            text: `This is a gentle reminder to take your prescription.`
                        };
    
                        const transporter = nodemailer.createTransport({
                            host: "smtp.zoho.com",
                            port: 465,
                            secure: true, 
                            auth: {
                                user: 'hello@playground.com.ng' ,
                                pass: '1Y!7CfdrC:28eT'
                            },
                            tls: {
                                // do not fail on invalid certs
                                rejectUnauthorized: false
                            }
                            });
    
                        transporter.sendMail(msg, (error, response) => {
                            if (error) {
                                console.log(error);
                            }
    
                            console.log(response)
    
                            
                        });

                        res.status(200).send({
                            success: 'Prescription reminder sent',
                            prescription: prescription
                        })
                    })
                    .catch((err) => {
                        res.status(400).send({
                            err: err
                        })
                    })
            })
            .catch(error => res.status(400).send(error)); 
    },

    async removePrescription(req, res, next) {
        await Users
            .findOne({
                where: {
                    email: res.locals.decodedToken
                }
            }).then((user) => {
                const updateValues = req.body;
                Prescription
                    .destroy(updateValues, {
                        where: {
                            userId: user.id
                        }
                    })
                    .then((prescription) => {
                        res.status(200).send({
                            success: 'Prescription updated',
                            prescription: prescription
                        })
                    })
                    .catch((err) => {
                        res.status(400).send({
                            err: err
                        })
                    })
            })
            .catch(error => res.status(400).send(error)); 
    }
}