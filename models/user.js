const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt   = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')  // default nodejs package

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please provide a name'],
        maxlength: [40 , 'Name should be under 40 characters']
    },
    email: {
        type: String,
        required: [true,'Please provide a email'],
        validate: [validator.isEmail , 'Please enter email in correct format '],
        unique: true
    
    },
    password: {
        type: String,
        required: [true,'Please provide a password'],
        minlength:[6,'Password should be atleast 6 chars'],
        select: false , /// to avaoid password to come with user to use password field ow we have to explixitly define    
    },
    role: {
        type: String,
        default: 'user'
    },
    photo: {
        id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        },
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now,

    },
        
        
    
});

/// encrpyt password before save - HOOKS
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){   // this checks if the password is modified before performing hash it is necessary to avoid hashing everytime user is called
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});


// validate the password with passed on user password
userSchema.methods.isValidatedPassword = async function(usersendPassword){
    return bcrypt.compare(usersendPassword , this.password)

};

// create and return jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY,
    });
};

// generate forgot password token(string)

userSchema.methods.getForgotPasswordToken = function () {
  // generate a long and randomg string
  const forgotToken = crypto.randomBytes(20).toString("hex");

  // getting a hash - make sure to get a hash on backend
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  //time of token
  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

    /// when the users send back the forgotToken make sure you encrypt and then compare with the hash of forgot token in the database
    return forgotToken
}

module.exports=mongoose.model('User' , userSchema);