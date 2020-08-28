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

        await Prescription
            .create({
                name,
                formula,
                status: Status.unverified,
                duration
            })
            .then((prescription) => {
                res.status(200).send({
                    success: 'Prescription added (drug usagenot verified)',
                    prescription: prescription
                })
            })
            .catch((err) => {
                res.status(400).send({
                    err: err
                })
            })
    },

    async updatePrescription(req, res, next) {
        await Prescription
    }
}