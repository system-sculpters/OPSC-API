const { Category } = require('../config')

const getCategories = async (req, res) =>{
    const {id} = req.params
    console.log(`this is the id: ${id}`)
    try {
        const snapshot = await Category
            .where('userid', '==', id)
            .get();

        const list = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
        
        console.log(list);
            
        res.status(200).json(list);
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
}

const createCategory = async (req, res) =>{
    const {color, icon, name, transactiontype, userid} = req.body;
    const createdAt = Date.now()

    const newCategory = {
        color: color,
        icon: icon,
        name: name,
        transactiontype: transactiontype, 
        userid: userid,
        createdAt: createdAt
    }
    try { 
        await Category.add( newCategory );
        //res.status(201).json({ message: 'Category created successfully.' });
        res.send({ message: "Category Added" });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
}

const updateCategory = async (req, res) =>{
    const { id } = req.params;
    const { color, icon, name, transactiontype } = req.body;
    const updatedAt = Date.now()

    const updatedCategory = {
        ...(color && { color }),
        ...(icon && { icon }),
        ...(name && { name }),
        ...(transactiontype && { transactiontype }),
        updatedAt
    };
    
    try {
        const CategoryRef = await Category.doc(id);
        await CategoryRef.update( updatedCategory );
        res.status(200).json({ message: 'Category updated successfully.' });
    } catch (error) {
        console.error('Error updating Category:', error);
        res.status(500).json({ error: 'Failed to update Category' });
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