const { Transaction, Category} = require('../config')

const getTransactionsByMonth = async (req, res) => {
    const { id } = req.params;
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1); // Start of the month 12 months ago

    try {
        const snapshot = await Transaction
        .where('userid', '==', id) // Access the nested `userid
        //.where('date', '>=', twelveMonthsAgo.getTime()) 
        .get();

        console.log(`Found ${snapshot.size} transactions for userid: ${id}`);
        // const allTransactionsSnapshot = await Transaction.get();

        // allTransactionsSnapshot.docs.forEach(doc => {
        //     const data = doc.data();
        //     console.log(`ransaction: ${JSON.stringify(doc.data())}`);
        // });
        
       
        if (snapshot.empty) {
            console.log('No matching transactions.');
            return res.status(200).json({ monthlyTransactions: [] });
        }

        const transactions = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                date: new Date(data.date), // Assuming `data.date` is stored as a timestamp
            };
        });

        // Group Transactions by Month and Year
        const transactionsByMonth = transactions.reduce((acc, transaction) => {
            const monthYear = `${transaction.date.getMonth() + 1}-${transaction.date.getFullYear()}`;

            if (!acc[monthYear]) {
                acc[monthYear] = { total: 0, count: 0};
            }

            acc[monthYear].total += transaction.amount; 
            acc[monthYear].count += 1// Increment the count
            return acc;
        }, {});

        // Fill in Missing Months
        const monthlyTransactions = [];
        for (let i = 0; i < 12; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

            monthlyTransactions.push({
                month: date.toLocaleString('default', { month: 'long', year: 'numeric' }).substring(0, 3),
                total: transactionsByMonth[monthYear]?.total || 0,
                count: transactionsByMonth[monthYear]?.count || 0
            });
        }

        res.status(200).json({ monthlyTransactions });
    } catch (error) {
        console.error('Error getting transactions by month:', error);
        res.status(500).json({ error: 'Failed to fetch transactions by month' });
    }
};



const getExpenseCategoryStats = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch all categories
        const categorySnapshot = await Category.where('userid', '==', id).get();
        const categories = categorySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name, // Assuming each category has a 'name' field
        }));
        //return res.status(200).json({ categories });

        // Fetch all transactions for the user
        const transactionSnapshot = await Transaction
        .where('userid', '==', id).get();

        if (transactionSnapshot.empty) {
            console.log(`No transactions found for userid: ${id}`);
            // Return all categories with zero amounts
            const emptyCategories = categories.map(category => ({
                categoryId: category.id,
                categoryName: category.name,
                totalAmount: 0,
                transactionCount: 0,
            }));
            return res.status(200).json({ categories: emptyCategories });
        }

        const transactions = transactionSnapshot.docs.map(doc => doc.data());
        console.log(transactions)
        // Filter only expenses
        const expenses = transactions.filter(transaction => transaction.type === 'Expense');
        console.log(`Expenses: ${JSON.stringify(expenses)}`)
        // Calculate the total amount spent per category
        const categoryStats = expenses.reduce((acc, expense) => {
            const { categoryId, amount } = expense;

            console.log(`${categoryId} - ${amount}`)
            if (!acc[categoryId]) {
                acc[categoryId] = { total: 0, count: 0 };
            }

            acc[categoryId].total += amount;
            acc[categoryId].count += 1;
            console.log(`${acc[categoryId].total} - ${acc[categoryId].count }`)
            return acc;
        }, {});

        // Combine all categories with calculated stats, ensuring all categories are included
        const formattedStats = categories.map(category => ({
            categoryId: category.id,
            categoryName: category.name,
            totalAmount: categoryStats[category.id]?.total || 0,
            transactionCount: categoryStats[category.id]?.count || 0,
        }));

        res.status(200).json({ categories: formattedStats });
    } catch (error) {
        console.error('Error getting expense category stats:', error);
        res.status(500).json({ error: 'Failed to fetch expense category stats' });
    }
};





module.exports = { getTransactionsByMonth, getExpenseCategoryStats }