const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const productModel = require("../model/productModel");
const { formatDate } = require("../../utils/dateConversion");

exports.createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    manufacturer,
    quantity,
    reviews,
    dateOfManufacture,
    expiryDate,
  } = req.body;
  if (
    !name ||
    !description ||
    !price ||
    !category ||
    !manufacturer ||
    !dateOfManufacture ||
    !expiryDate
  ) {
    return res.status(400).send({
      message:
        "All fields are required which are name, description, price, category, manufacturer, dateOfManufacture, expiryDate",
    });
  }
  const allcategory = [
    "electronic",
    "fashion",
    "furniture",
    "sports",
    "books",
    "groceries",
  ];
  if (!allcategory.includes(category)) {
    return res.status(400).send({
      message:
        "Invalid category valid values are electronic, fashion, furniture, sports, books, groceries",
    });
  }
  try {
    const findProduct = await productModel.findOne({ name: name });
    if (findProduct) {
      return res
        .status(400)
        .send({ message: "Product already exists with this name" });
    }
    const product = new productModel({
      name: name,
      description: description,
      price: price,
      category: category,
      manufacturer: manufacturer,
      dateOfManufacture: dateOfManufacture,
      expiryDate: expiryDate,
    });
    if (quantity) {
      product.quantity = quantity;
    }
    if (reviews) {
      product.reviews = reviews;
    }
    const result = await product.save();
    return res
      .status(200)
      .send({ message: "Product created successfully", data: result });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.getAllProductsbyCategory = async (req, res) => {
  const category = req.query.category;
  try {
    const result = await productModel.aggregate([
      {
        $match: { category: category },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    if (result.length == 0) {
      return res
        .status(400)
        .send({ message: "No products found with this category" });
    }
    return res.status(200).send({ message: "All products", data: result });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.getProductByPrice = async (req, res) => {
  const startingPrice = parseInt(req.query.startingPrice);
  const endingPrice = parseInt(req.query.endingPrice);
  try {
    const result = await productModel.aggregate([
      {
        $match: {
          price: {
            $gte: startingPrice,
            $lte: endingPrice,
          },
        },
      },
      {
        $sort: { price: -1 },
      },
    ]);
    return res.status(200).send({ message: "All products", data: result });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.getProductWhichAreActive = async (req, res) => {
  try {
    const current_date = new Date();
    const result = await productModel.aggregate([
      {
        $addFields: {
          expiryDate: {
            $dateFromString: {
              dateString: "$expiryDate",
              format: "%d/%m/%Y",
            },
          },
        },
      },
      {
        $match: {
          expiryDate: {
            $gte: current_date,
          },
        },
      },
    ]);

    return res.status(200).send({ message: "All products", data: result });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.getAllProductByQuantity = async (req, res) => {
  const quantity = parseInt(req.query.quantity);
  console.log(quantity);
  try {
    const result = await productModel.aggregate([
      {
        $match: {
          quantity: {
            $gte: quantity,
          },
        },
      },
      {
        $project: {
          category: 1,
        },
      },
    ]);
    return res
      .status(200)
      .send({ message: "All products by quantity", data: result });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.getAllProductsByCategoryCount = async (req, res) => {
  try {
    const result = await productModel.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      }
    ]);
    return res.status(200).send({ message: "All products", data: result });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
