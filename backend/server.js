import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import expensesRoutes from './routes/expensesRoutes.js';
import authRoutes from './routes/authRoutes.js';
//import expensesRoutes from './routes/expensesRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// MongoDB connection string
const mongoURI = 'mongodb+srv://bondolo90:RoTKuRHDx2KZZHth@cluster0.qpajh96.mongodb.net/';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB')) // Log on successful connection
.catch(err => console.error('Error connecting to MongoDB:', err)); // Catch and log any errors during initial connection

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err); // Log subsequent connection errors
});

// Routes
app.use('/auth', authRoutes);
//app.use('/expenses', authMiddleware, expensesRoutes);
app.use('/expenses', expensesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
