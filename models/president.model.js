const mongoose = require("mongoose")

const presidentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    year:{
        type:Number,
        required:true,
    },
    about:{
        type:String
    },
    photo:{
        type:String
    }

})

module.exports = mongoose.model("president",presidentSchema)