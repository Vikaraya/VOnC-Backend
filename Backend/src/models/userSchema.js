const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email:{
       type:String,
       required:[true,"Email is required"],
       unique:true,
       trim:true,
       lowercase:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true
    }
})

module.exports = mongoose.model("user",userSchema)