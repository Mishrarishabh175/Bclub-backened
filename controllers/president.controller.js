const President = require("../models/president.model")
const path=require("path")

const addPresident = async(req,res)=>{
    try {
        const newPresident = President({
            name:req.body.name,
            year:req.body.year,
            about:req.body.about,
            photo:req.file.filename,
        })

        const result = await newPresident.save();
        res.send(result);
    } catch (error) {
        console.log(error.message)
    }
}

const getPresidents = async(req,res)=>{
    try {
        const result = await President.find();
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
}
const getPresidentImage = async(req,res)=>{
    try {
        const result = await President.findOne({_id:req.params.id})
        //res.send(result)
        res.sendFile(path.join(__dirname,"../public/presidentImages/",result.photo))
    } catch (error) {
        console.log(error.message)
    }
}
module.exports ={
    addPresident,
    getPresidents,
    getPresidentImage
}