const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Create a new item
router.post('/items', itemController.createItem);

// Get all items
router.get('/items', itemController.getItems);

// Get a single item by ID
router.get('/items/:id', itemController.getItemById);

// Update an item by ID
router.put('/items/:id', itemController.updateItemById);

// Delete an item by ID
router.delete('/items/:id', itemController.deleteItemById);

module.exports = router;
