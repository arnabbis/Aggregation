const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
router.post('/createProduct', productController.createProduct);
router.get('/getAllProductsByCategory', productController.getAllProductsbyCategory);
router.get('/getAllProductsByPrice', productController.getProductByPrice);
router.get('/getAllActiveProducts', productController.getProductWhichAreActive);
router.get('/getAllProductByQuantity', productController.getAllProductByQuantity);
router.get('/getAllProductsCountByCategory', productController.getAllProductsByCategoryCount);
module.exports = router