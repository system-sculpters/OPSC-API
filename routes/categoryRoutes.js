const router = require('express').Router();
const { verifyToken, verifyUser } = require('../middleware/authMiddleware');
const { getCategories, createCategory, updateCategory, deleteCategory } =  require('../controller/categoryController')

router.get('/:id', verifyToken, getCategories);

router.post('/create', verifyToken, createCategory);

router.put('/:id', verifyToken, updateCategory);

router.delete('/:id', verifyToken, deleteCategory);

module.exports = router;