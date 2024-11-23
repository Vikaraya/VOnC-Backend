const mongoose = require("mongoose")

const dbConnection = async (url) => {
    try{
        await mongoose.connect(url)
        console.log("mongoDB connected succesfully")
    }
    catch(err){
        console.log("mongoDB connection error :",err)
    }
}

module.exports = dbConnection;

