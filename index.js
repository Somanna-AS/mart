const express = require('express');
const app=express();
const path = require('path');
const mongoose = require('mongoose');
const product = require('./models/product')
const methodOverride = require('method-override');



mongoose.connect('mongodb://localhost:27017/farmstand', {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() =>{
        console.log("Mongo connection is open!!!!!");
    })
    .catch(err =>{
        console.log("error occurred");
        console.log(err)
    })
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

const category=['fruit','vegetable','dairy'];

app.get('/products',async (req,res) => {
    const {category} = req.query;
    if(category){    
        const products= await product.find({ category})
        res.render('Products/index',{products, category})
    }else{
        const products= await product.find({})
        res.render('Products/index',{products,category: 'All'})
    }
    
})


app.post('/products', async (req,res) =>{
    const newprd = new product(req.body);
    await newprd.save();
    // res.redirect(`/products/${newprd._id}`)
    res.redirect('/products')
})


app.get('/products/:id',async (req,res) =>{
    const {id} = req.params;
    const reqprd = await product.findById(id);
    res.render('Products/showproduct', {reqprd});
})

app.get('/products/:id/edit',async (req,res) =>{
    const {id} = req.params;
    const reqprd = await product.findById(id);
    res.render('Products/edit', { reqprd, category });
})

app.get('/newitm', (req,res) => {
    res.render('Products/new', {category});
})


app.put('/products/:id',async (req,res) =>{

    const {id} = req.params;
     await product.findByIdAndUpdate(id, req.body ,{runValidators: true, new: true});
    res.redirect(`/products/${ id}`)
    
})

app.delete('/products/:id',async (req,res) =>{
    const {id} = req.params;
    await product.findByIdAndDelete(id);
    res.redirect('/products')
})

app.listen(3000,() =>{
    console.log(" app running on port 3000")
})