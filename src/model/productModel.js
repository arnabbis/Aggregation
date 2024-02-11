const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ["electronic", "fashion", "furniture", "sports", "books", "groceries"],
        required: true
    },
    manufacturer: {
        type: String,
        required: true  
    },
    quantity: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: String,
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
            comment: String
        }
    ]
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema)