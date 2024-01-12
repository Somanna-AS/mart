const mongoose = require('mongoose');
const product = require('./models/product')


mongoose.connect('mongodb://localhost:27017/farmstand', {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() =>{
        console.log("Mongo connection is open!!!!!");
    })
    .catch(err =>{
        console.log("error occurred");
        console.log(err)
    })

    const seedprd= [
        {
            name:'Grapes',
            price: 100,
            category: 'fruit'
        },
        {
            name: 'Egg plant',
            price: 50,
            category: 'vegetable'
        },
        {
            name: 'Watermelon',
            price: 150,
            category: 'fruit'
        },
        {
            name: 'Milk',
            price: 25,
            category: 'dairy'
        },{
            name: 'Egg',
            price: 150,
            category: 'dairy'
        },
    ]

    product.insertMany(seedprd)
    .then(re => {
        console.log(re)
    })
    .catch(e => {
        console.log(e)
    })