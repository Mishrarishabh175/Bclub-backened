const mongoose = require("mongoose")

const youtubeSessionSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("youtubeSession",youtubeSessionSchema)