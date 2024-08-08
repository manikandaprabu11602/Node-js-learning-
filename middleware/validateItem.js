const { body, validationResult } = require('express-validator');

// Validation rules for creating and updating an item
const validateItem = [
  body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = validateItem;
