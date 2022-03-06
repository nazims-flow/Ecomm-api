const Product = require('../models/product');
const BigPromise = require('../middlewares/bigPromise');
const CustomError = require('../utils/customError');
const cloudinary = require('cloudinary');
const WhereClause = require('../utils/whereClause');


exports.addProduct = BigPromise(async( req, res , next)=> {

    //images
     let imageArray = []

     if(!req.files) {
        return next(new CustomError('images are required' , 401))
     }
      
     if(req.files) {
         for (let index =0; index<req.files.photos.length; index++) {

            let result = await cloudinary.v2.uploader.upload(
                req.files.photos[index].tempFilePath,
                {
                    folder: "products" ,
                }
            );

            imageArray.push({
                id: result.public_id,
                secure_url: result.secure_url
            })
         }
     }


    req.body.photos = imageArray
    req.body.user = req.user.id


    const product = await Product.create(req.body);

    res.status(200).json({
        success: true ,
        product,
    });

});


exports.getAllProduct= BigPromise(async (req, res, next)=>{
    const resultperpage = 6

    const totalcountProduct = await Product.countDocuments()

    

    const productsObj = new WhereClause(Product.find(), req.query).search().filter();

    let products = await productsObj.base

    const filteredProductNumber = products.length



    productsObj.pager(resultperpage)  // products.limit().skip() same meaning
    products = await productsObj.base.clone();// above line same


    res.status(200).json({
        success: true,
        products,
        filteredProductNumber,
        totalcountProduct

    })
})



exports.testProduct =(req,res)=>{
    res.status(200).json({
        success:true,
        greeting:"test from product"
    })
};