const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const upload = require('../middleware/upload'); // Import the upload middleware
const validateItem = require('../middleware/validateItem'); // Import validation middleware

// Create a new item with image upload and validation
router.post('/items', upload.single('image'), validateItem, itemController.createItem);

// Update an item by ID with image upload and validation
router.put('/items/:id', upload.single('image'), validateItem, itemController.updateItemById);

router.get('/items', itemController.getItems);
router.get('/items/:id', itemController.getItemById);
router.delete('/items/:id', itemController.deleteItemById);

module.exports = router;
