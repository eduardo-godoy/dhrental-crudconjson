const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname + '../../database/products.json'); // TRAE TODOS LOS PRODUCTOS EN FORMA JSON
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); // CONVIERTE LOS PRODUCTOS DE UN JSON EN UN ARRAY

const inSale = products.filter(function(product){return product.oferta == "En-oferta";});

const controllers = {
    index: (req,res) => {
        res.render('index',{inSale});
    },
    contact: (req,res) => {
        res.render('contact')
    },
    us: (req,res) => {
        res.render('us')
    },
}

module.exports = controllers;