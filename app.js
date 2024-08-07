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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
});

const Item = mongoose.model('Item', itemSchema);

app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: savedItem,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json({
      success: true,
      message: 'Items retrieved successfully',
      data: items,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }
    res.json({
      success: true,
      message: 'Item retrieved successfully',
      data: item,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedItem == null) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }
    res.json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (deletedItem == null) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }
    res.json({
      success: true,
      message: 'Item deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
