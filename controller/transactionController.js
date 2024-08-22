const { Transaction, Category } = require('../config')

const getTransactions = async (req, res) => {
    const { id } = req.params;
    console.log(`Received request for user id: ${id}`);
    try {
        const snapshot = await Transaction
        .where('userid', '==', id)
        .get();

        // Filter transactions by `userid`
        const transactionsSnapshot = snapshot.docs
            .map(doc => {
                const data = doc.data(); // Access the nested `data` object
                console.log(`Transaction data: ${JSON.stringify(data)}`);
                return { id: doc.id, ...data };
            })

        if (transactionsSnapshot.length === 0) {
            console.log('No matching transactions.');
            return res.status(200).json({ transactions: [] });
        }

        const transactionsWithCategory = [];

        // Iterate through each transaction to get the associated category
        for (const transaction of transactionsSnapshot) {
            const categoryId = transaction.categoryId;
            console.log(`Processing transaction with id ${transaction.id} and categoryId ${categoryId}`);

            if (categoryId) {
                const categorySnapshot = await Category.doc(categoryId).get();

                if (categorySnapshot.exists) {
                    const category = categorySnapshot.data();
                    console.log(`Found category: ${JSON.stringify(category)}`);

                    transactionsWithCategory.push({
                        transactionId: transaction.id,
                        ...transaction,
                        categoryId: categorySnapshot.id,
                        category: category
                    });
                } else {
                    console.log(`No matching category found for categoryId: ${categoryId}`);
                }
            } else {
                console.log(`No categoryId found in transaction: ${transaction.id}`);
            }
        }

        console.log(transactionsWithCategory);
        res.status(200).json({ transactions: transactionsWithCategory });
    } catch (error) {
        console.error('Error getting transactions and categories:', error);
        res.status(500).json({ error: 'Failed to fetch transactions and categories' });
    }
};




const createTransaction = async (req, res) =>{
    const data = req.body;
    data.date = Date.now()
    console.log(data)
    //const { userid, name } = data
    try {
        await Transaction.add( data );
        res.status(201).json({ message: 'Transaction created successfully.' });
    } catch (error) {
        console.error('Error creating Transaction:', error);
        res.status(500).json({ error: 'Failed to create Transaction' });
    }
}

const updateTransaction = async (req, res) =>{
    const { id } = req.params;
    const updateData = req.body
    
    try {
        const TransactionRef = await Transaction.doc(id);
        await TransactionRef.update( updateData);
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