const router = require('express').Router();
const { verifyToken, verifyUser } = require('../middleware/authMiddleware');
const { getCategories, createCategory, updateCategory, deleteCategory } =  require('../controller/categoryController')

router.get('/:id', verifyToken, verifyUser, getCategories);

router.post('/create', verifyToken, verifyUser, createCategory);

router.put('/:id', verifyToken, verifyUser, updateCategory);

router.delete('/:id', verifyToken, verifyUser, deleteCategory);

module.exports = router;