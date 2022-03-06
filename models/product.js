const mongoose = require('mongoose')



const productSchema = new mongoose.Schema({

    name:{
        type: String ,
        required: [ true , 'please provide product name'],
        trim : true,
        maxlength: [120 , 'product name should not be more than 120 characters']
    },
    price:{
        type: Number ,
        required: [ true , 'please provide product price'],
        trim : true,
        maxlength: [5, 'product price should not be ore than 5 digits']
    },
    description:{
        type: String ,
        required: [ true , 'please provide product description'],
        trim : true,
        
    },
    photos:[
        {
            id : {
                type: String ,
                required: true 
            },
            secure_url : {
                type: String ,
                required: true 
            },
        }
    ],
    category:{
        type: String ,
        required: [ true , 'please select category from short-sleeves , long - sleeves , sweat - shirts , hoodies '],
        enum: {
            values :[
                'shortsleeves',
                'longsleeves',
                'sweatshirt',
                'hoodies'
            ],
            message: 'please select category only  from- short - sleeves , long - sleeves , sweat - shirts , hoodies ',
        }
    },

    brand: {
        type: String ,
        required : [ true , 'please add a brand for clothing ']
    },

    ratings : {
        type: Number,
        deafault : 0
    } , 

    numberOfReviews : {
        type: Number,
        deafault : 0
    },
    reviews : [
        {
            user : {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true 
            },
            name : {
                type: String ,
                required: true,
            },
            rating :{
                type: Number ,
                required: true 
            },
            comment :{
                type: String ,
                required: true 
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true 
    },
    createdAt:{
        type: Date,
         default: Date.now,
    }



})






module.exports=mongoose.model('Product' , productSchema);