const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
router.post('/createProduct', productController.createProduct);
router.get('/getAllProductsByCategory', productController.getAllProductsbyCategory);
router.get('/getAllProductsByPrice', productController.getProductByPrice);
module.exports = router