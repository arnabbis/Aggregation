const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const productModel = require('../model/productModel');

exports.createProduct = async (req, res) => {
    
    const { name, description, price, category, manufacturer, quantity, reviews } = req.body;
    if(!name || !description || !price || !category || !manufacturer) {
        return res.status(400).send({ message: "All fields are required which are name, description, price, category, manufacturer" });
    }
    try {
        const product = new productModel({
            name: name,
            description: description ,
            price: price,
            category: category,
            manufacturer: manufacturer
        });
        if (quantity) {
            product.quantity = quantity;
        }
        if (reviews) {
            product.reviews = reviews;
        }
        console.log("product", product);
        const result = await product.save();
        return res.status(200).send({ message: "Product created successfully", data: result });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}