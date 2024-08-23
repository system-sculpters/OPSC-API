const router = require('express').Router()
const { updateEmailAndUsername, updatePassword} = require('../controller/userController')

router.put('/:uid/update-email-and-username', updateEmailAndUsername)

router.put('/:uid/update-password', updatePassword)
 
module.exports = router