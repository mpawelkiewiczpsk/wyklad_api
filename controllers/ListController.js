const List = require('../models/list');


exports.getProducts = async (req, res) => {

    let result = await List.getProducts()

    res.json(result)

};

exports.getProductsById = async (req, res) => {

    let result = await List.getProductsById(req.params.id)

    res.json(result)

};

exports.addNewProduct = async (req, res) => {

    let result = await List.addNewProduct(req.body)

    res.json(result)

};

exports.updateProduct = async (req, res) => {

    let result = await List.updateProduct(req.body)

    res.json(result)

};
