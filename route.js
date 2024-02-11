const express = require('express');
const router = express.Router();
const user = require('./src/route/userRoute');
const product = require('./src/route/productRoute');
router.use('/user',user)
router.use('/product',product)
module.exports = router