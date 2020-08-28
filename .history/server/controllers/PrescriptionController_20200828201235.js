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