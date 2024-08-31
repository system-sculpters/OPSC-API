const router = require('express').Router()
const { verifyToken, verifyUser } = require('../middleware/authMiddleware')
const { getUser, updateEmailAndUsername, updatePassword} = require('../controller/userController')

router.get('/:id', verifyToken, verifyUser, getUser)

router.put('/:id/update-email-and-username', verifyToken, verifyUser, updateEmailAndUsername)

router.put('/:id/update-password', verifyToken, verifyUser, updatePassword)
 
module.exports = router