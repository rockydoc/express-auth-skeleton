var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
    name: String,
    category: String,
    price: Number,
    stock: Number,
    category: String
});

var Category = new Schema({
    name: String
});


module.exports = { 
    Product: mongoose.model('Product', Product) ,
    Category: mongoose.model('Category', Category)
}
