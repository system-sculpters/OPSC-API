const router = require('express').Router();
const { signup, signin, logout} = require('../controller/authController')

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/logout', logout);

module.exports = router