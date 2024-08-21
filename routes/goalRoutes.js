const router = require('express').Router();
const { getGoals, createGoal, updateGoal, deleteGoal } =  require('../controller/goalController')

router.get('/:id', getGoals);

router.post('/create', createGoal);

router.put('/:id', updateGoal);

router.delete('/:id', deleteGoal);

module.exports = router;