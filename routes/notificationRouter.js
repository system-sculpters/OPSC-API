const router = require('express').Router()
const { createNotification, getNotifications, markAsRead, registerToken } = require('../controller/notificationController')

router.get('/:id', getNotifications);

router.post('/create', createNotification)

router.put('/:id', markAsRead)

router.put('/:id/register-token', registerToken)

module.exports = router