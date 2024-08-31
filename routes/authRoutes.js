const router = require('express').Router();
const { signup, signin, logout } = require('../controller/authController')
const { checkToken } = require('../middleware/authMiddleware')

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/logout', logout);

router.post('/verify-token', checkToken)

module.exports = router