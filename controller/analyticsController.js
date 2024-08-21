const { Transaction, Category} = require('../config')

const getTransactionsByMonth = async (req, res) => {
    const { id } = req.params;
    const now = new Date();
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(now.getMonth() - 11); // Get the date 12 months ago

    try {
        const snapshot = await Transaction
            .where('userid', '==', id)
            .where('date', '>=', twelveMonthsAgo)
            .get();

        if (snapshot.empty) {
            console.log('No matching transactions.');
            return res.status(200).json({ monthlyTransactions: [] });
        }

        const transactions = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                date: new Date(data.date), // Ensure date is a Date object
            };
        });

        // Step 2: Group Transactions by Month and Year
        const transactionsByMonth = transactions.reduce((acc, transaction) => {
            const monthYear = `${transaction.date.getMonth() + 1}-${transaction.date.getFullYear()}`; // Month-Year format

            if (!acc[monthYear]) {
                acc[monthYear] = 0; // Initialize count if not present
            }

            acc[monthYear] += 1; // Increment the count
            return acc;
        }, {});

        // Step 3: Fill in Missing Months
        const monthlyTransactions = [];
        for (let i = 0; i < 12; i++) {
            const date = new Date();
            date.setMonth(now.getMonth() - i);
            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
            
            monthlyTransactions.push({
                month: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
                total: transactionsByMonth[monthYear] || 0, // Use 0 if no transactions for this month
            });
        }

        res.status(200).json({ monthlyTransactions });
    } catch (error) {
        console.error('Error getting transactions by month:', error);
        res.status(500).json({ error: 'Failed to fetch transactions by month' });
    }
};




module.exports = { getTransactionsByMonth }