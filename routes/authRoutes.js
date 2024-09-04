const router = require('express').Router();
const { signup, signin, logout, reauthenticateUser } = require('../controller/authController')
const { checkToken } = require('../middleware/authMiddleware')

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/logout', logout);

router.post('/reauthenticate', reauthenticateUser)

module.exports = router