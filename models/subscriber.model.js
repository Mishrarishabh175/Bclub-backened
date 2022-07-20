const mongoose = require("mongoose")

const subcriberSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("subcriber",subcriberSchema)