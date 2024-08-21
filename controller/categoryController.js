const { Category } = require('../config')

const getCategories = async (req, res) =>{
    const {id} = req.params
    console.log(`this is the id: ${id}`)
    try {
        const snapshot = await Category.get();
        const list = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(doc => doc.data.userid === id);
        console.log(list);
    
        
        res.status(200).json({list});
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
}

const createCategory = async (req, res) =>{
    const data = req.body;
    //const { userid, name } = data
    try { 
        await Category.add({ data });
        //res.status(201).json({ message: 'Category created successfully.' });
        res.send({ msg: "User Added" });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
}

const updateCategory = async (req, res) =>{
    const { id } = req.params;
    const { name, color,  icon, transaction_type } = req.body;
    try {
        const categoryRef = Category.doc(id);
        await categoryRef.update({ name, color,  icon, transaction_type });
        res.status(200).json({ message: 'Category updated successfully.' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Failed to update category' });
    }
}


const deleteCategory = async (req, res) =>{
    const { id } = req.params;
    try {
        const categoryRef = Category.doc(id);
        await categoryRef.delete();
        res.status(200).json({ message: 'Category deleted successfully.' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
}


module.exports = { getCategories, createCategory, updateCategory, deleteCategory }