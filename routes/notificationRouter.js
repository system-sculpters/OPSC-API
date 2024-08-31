const router = require('express').Router()
const { createNotification, getNotifications, markAsRead, registerToken } = require('../controller/notificationController')
const { verifyToken, verifyUser } = require('../middleware/authMiddleware');

router.get('/:id', verifyToken, verifyUser,getNotifications);

router.post('/create', verifyToken, verifyUser, createNotification)

router.put('/:id', verifyToken, verifyUser, markAsRead)

router.put('/:id/register-token', verifyToken, verifyUser, registerToken)

module.exports = router