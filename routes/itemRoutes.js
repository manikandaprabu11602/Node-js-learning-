// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const upload = require('../middleware/upload'); // Import the upload middleware

// Create a new item with image upload
router.post('/items', upload.single('image'), itemController.createItem);

// Update an item by ID with image upload
router.put('/items/:id', upload.single('image'), itemController.updateItemById);

router.get('/items', itemController.getItems);
router.get('/items/:id', itemController.getItemById);
router.delete('/items/:id', itemController.deleteItemById);

module.exports = router;
