const router = require('express').Router();
const { getGoals, createGoal, updateGoal, deleteGoal } =  require('../controller/goalController')
const { verifyToken, verifyUser } = require('../middleware/authMiddleware');

router.get('/:id', verifyToken, getGoals);

router.post('/create', verifyToken, createGoal);

router.put('/:id', verifyToken, updateGoal);

router.delete('/:id', verifyToken, deleteGoal);

module.exports = router;