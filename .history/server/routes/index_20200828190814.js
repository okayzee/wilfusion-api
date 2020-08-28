//Controllers
const UserController = require('../controllers/UsersController')
// const AdminController = require('../controllers/AdminController')
const PrescriptionController = require('../controllers/PrescriptionController')

//Custom Middleware
const verifyToken = require('../middleware/verifyToken');
const register = require('../middleware/register');
const login = require('../middleware/login');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const adminCheck = require('../middleware/adminCheck');
const emailCheck = require('../middleware/emailCheck');

const loginHandler = require('../middleware/loginHandler');
const verifyHeaders = require('../middleware/verifyHeaders');

module.exports = (app) => {
    app.get('/api', (req, res) => {
        res.status(200).send({
            success: 'This is the API endpoint.'
        })
    });
    app.get('/api/users', UserController.mock);
    app.post('/api/register', [emailCheck, register], UserController.register);
    app.post('/api/login', login, UserController.login, loginHandler);
    // app.post('/api/resend-verification', UserController.resendVerification);
    app.post('/api/forgot-password', [emailCheck, auth], UserController.forgotPassword);
    app.post('/api/reset-password/:token', verifyToken, UserController.resetPassword);
    app.delete('/api/destroy', adminCheck, UserController.destroy);
    app.get('/api/verify-email/:token', verifyToken, UserController.verifyEmail);
    app.get('/api/emailTest', UserController.emailTest);


    app.get('/api/prescription', PrescriptionController.mock);

}