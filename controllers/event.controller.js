const Event = require("../models/event.model")
const fs = require("fs")
const { promisify } = require("util")
const unlinkAsync  = promisify(fs.unlink)
const path = require('path')

const addEvent = async(req,res)=>{
    try {
        const imagesName = req.files.map((file)=>file.filename)
        const event = Event({
            title:req.body.title,
            content:req.body.content,
            images:imagesName,
            hashTags:req.body.hashTags,
            date:req.body.date
        })
        const result = await event.save()
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
}
const deleteEvent = async(req,res)=>{
    try {
        const result = await Event.findOne({_id:req.params.id})
        await Event.deleteOne({_id:req.params.id})
        result.images.forEach(async(image)=>{
            await unlinkAsync(path.join(__dirname,"../public/eventImages/",image))
        })
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
}
const getEvents = async(req,res)=>{
    try {
        const result = await Event.find().sort({$natural:-1})
        res.status(200).send(result)
    } catch (error) {
        console.log(error.message)
    }
}

const getEvent = async(req,res)=>{
    try {
        const result = await Event.findOne({_id:req.params.id})
        res.status(200).send(result)
    } catch (error) {
        console.log(error.message)
    }
}
const getImage = async(req,res)=>{
    try {
        res.sendFile(path.join(__dirname,"../public/eventImages",req.params.filename))
    } catch (error) {
        console.log(error.message)
    }
}

const addImage = async(req,res)=>{
    try {
        // const result = await Event.findOne({_id:req.body.id})
        // result.images.push(req.file.filename)
        const updated = await Event.updateOne({_id:req.body.id},{$push:{images:req.file.filename}})
        res.status(200).send(updated)
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    addEvent,
    deleteEvent,
    getEvents,
    getImage,
    addImage,
    getEvent
}