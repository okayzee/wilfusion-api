const Prescription = require('../models').Prescription;

module.exports = {
    mock(req, res) {
        res.status(200).send({
            message: 'prescription sent'
        })
    },

    async create(req, res) {
        const {name, formula, duration} = req.body

        await Prescription
            .create({
                name,
                formula,
                duration
            })
    }
}