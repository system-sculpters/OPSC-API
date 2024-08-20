const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');

app.use(cors());

app.use(express.json());
 


//const authRoute = require('./routes/authRoutes');
const transactionRoute = require('./routes/transactionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const translationRoutes = require('./routes/translateRoutes');


const PORT = process.env.PORT || 3001

//app.use('/api/auth/', authRoute);
app.use('/api/transaction/', transactionRoute);
app.use('/api/category', categoryRoutes);
app.use('/api/investment', investmentRoutes);
app.use('/api/translation', translationRoutes);

app.listen(PORT, () =>{
    console.log(`backend server is running at localhost:${PORT}`);
}); 