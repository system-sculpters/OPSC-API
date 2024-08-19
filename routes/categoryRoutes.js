const router = require('express').Router();
const { getCategories, createCategory, updateCategory, deleteCategory } =  require('../controller/categoryController')

router.get('/:id', getCategories);

router.post('/create', createCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;