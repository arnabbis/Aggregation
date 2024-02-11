const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const productModel = require('../model/productModel');

exports.createProduct = async (req, res) => {
    
    const { name, description, price, category, manufacturer, quantity, reviews, dateOfManufacture, expiryDate } = req.body;
    if(!name || !description || !price || !category || !manufacturer || !dateOfManufacture || !expiryDate) {
        return res.status(400).send({ message: "All fields are required which are name, description, price, category, manufacturer, dateOfManufacture, expiryDate" });
    }
    const allcategory = ["electronic", "fashion", "furniture", "sports", "books", "groceries"];
    if(!allcategory.includes(category)) {
        return res.status(400).send({ message: "Invalid category valid values are electronic, fashion, furniture, sports, books, groceries" });
    }
    try {
        const findProduct = await productModel.findOne({ name: name });
        if (findProduct) {
            return res.status(400).send({ message: "Product already exists with this name" });
        }
        const product = new productModel({
            name: name,
            description: description ,
            price: price,
            category: category,
            manufacturer: manufacturer,
            dateOfManufacture: dateOfManufacture,
            expiryDate: expiryDate
        });
        if (quantity) {
            product.quantity = quantity;
        }
        if (reviews) {
            product.reviews = reviews;
        }
        const result = await product.save();
        return res.status(200).send({ message: "Product created successfully", data: result });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}