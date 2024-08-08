const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Replace with your MongoDB connection string
mongoose.connect('mongodb://localhost:27017/mongo_crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import routes
const itemRoutes = require('./routes/itemRoutes');
app.use('/api', itemRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
