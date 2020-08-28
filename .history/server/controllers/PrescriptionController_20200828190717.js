const Prescription = require('../models').Prescription;

module.exports = {
    mock(req, res) {
        res.status(200).send({
            message: 'prescription sent'
        })
    }
}