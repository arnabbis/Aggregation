const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
router.post('/createProduct', productController.createProduct);
// router.get('/getAllProducts', productController.getAllProducts);
module.exports = router