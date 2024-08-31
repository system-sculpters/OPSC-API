const router = require('express').Router();
const { getGoals, createGoal, updateGoal, deleteGoal } =  require('../controller/goalController')
const { verifyToken, verifyUser } = require('../middleware/authMiddleware');

router.get('/:id', verifyToken, verifyUser, getGoals);

router.post('/create', verifyToken, verifyUser, createGoal);

router.put('/:id', verifyToken, verifyUser, updateGoal);

router.delete('/:id', verifyToken, verifyUser, deleteGoal);

module.exports = router;