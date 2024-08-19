const { Transaction } = require('../config')

const getTransactions = async (req, res) =>{
    const {id} = req.params
    try {
        const snapshot = await Transaction.where('userid', '==', id).get();
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(list);
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
}

const createTransaction = async (req, res) =>{
    const data = req.body;
    const { userid, name } = data
    try {
        await Transaction.add({ data });
        res.status(201).json({ message: 'Transaction created successfully.' });
    } catch (error) {
        console.error('Error creating Transaction:', error);
        res.status(500).json({ error: 'Failed to create Transaction' });
    }
}

const updateTransaction = async (req, res) =>{
    const { id } = req.params;
    const { name, color,  icon, transaction_type } = req.body;
    try {
        const TransactionRef = Transaction.doc(id);
        await TransactionRef.update({ name, color,  icon, transaction_type });
        res.status(200).json({ message: 'Transaction updated successfully.' });
    } catch (error) {
        console.error('Error updating Transaction:', error);
        res.status(500).json({ error: 'Failed to update Transaction' });
    }
}


const deleteTransaction = async (req, res) =>{
    const { id } = req.params;
    try {
        const TransactionRef = Transaction.doc(id);
        await TransactionRef.delete();
        res.status(200).json({ message: 'Transaction deleted successfully.' });
    } catch (error) {
        console.error('Error deleting Transaction:', error);
        res.status(500).json({ error: 'Failed to delete Transaction' });
    }
}


module.exports = { getTransactions, createTransaction, updateTransaction, deleteTransaction }