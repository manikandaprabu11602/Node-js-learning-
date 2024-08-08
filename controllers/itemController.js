const Item = require('../models/Item');

// Create a new item
exports.createItem = async (req, res) => {
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
};

// Get all items
exports.getItems = async (req, res) => {
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
};

// Get a single item by ID
exports.getItemById = async (req, res) => {
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
};

// Update an item by ID
exports.updateItemById = async (req, res) => {
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
};

// Delete an item by ID
exports.deleteItemById = async (req, res) => {
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
};
