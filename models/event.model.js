const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    images:{
        type:[String]
    },
    hashTags:{
        type:String
    },
    date:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("event",eventSchema)