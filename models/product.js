const mongoose = require('mongoose');


const prdschema =new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    category: {
        type : String,
        lowercase : true,
        enum : ['fruit','vegetable','dairy']
    }
})

const product = mongoose.model('product', prdschema);

module.exports = product;