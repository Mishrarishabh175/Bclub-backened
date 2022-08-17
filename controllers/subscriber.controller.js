const res = require("express/lib/response")
const Subscriber = require("../models/subscriber.model")
const nodemailer= require("nodemailer")
const { rawListeners } = require("../models/subscriber.model")

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:"user@gmail.com",
        pass:"userPass"
    },
})

const sendMailToSubscriber = async(mail,sub,body)=>{
    try {
        const info = await transporter.sendMail({
            from:"Bclub",
            to:mail,
            subject:sub,
            html:body
        })

        
    } catch (error) {
        console.log(error.message)
    }
}
const insertSubcriber = async(req,res)=>{

    try {
        const newSubcriber = Subscriber({
            name:req.body.name,
            email:req.body.email,
            date:req.body.date
        })
    
        const result = await newSubcriber.save()
        res.send(result)
    } catch (error) {
        console.log(error.message)
        res.send("email already exists")
    }
}
const deleteSubscriber = async(req,res) =>{
    try {
        const result = await Subscriber.deleteOne({_id:req.params.id})
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
}

const getSubscribers = async(req,res)=>{
    try {
        const result = await Subscriber.find();
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
}
const getSubscriber = async(req,res)=>{
    try {
        const result = await Subscriber.findOne({_id:req.params.id});
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
}
const updateSubscriber = async(req,res)=>{
    try {
        const result = await Subscriber.updateOne({_id:req.params.id},{$set:{
            email:req.body.email,
            name:req.body.name
        }});
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
}
const sendMailToSubscribers = async(sub,message)=>{
    try {
        const subcribers = await Subscriber.find()
        subcribers.map(async(subscriber) =>{
            const mail = subscriber.email
            const body = message
            await sendMailToSubscriber(mail,sub,body)
        })
    } catch (error) {
        console.log(error.message)
    }
}
const mailToSubscribers = async(req,res)=>{
    try {
        await sendMailToSubscribers(req.body.sub,req.body.message)
        res.send("Mail send successfully!")
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    insertSubcriber,
    deleteSubscriber,
    getSubscribers,
    sendMailToSubscribers,
    mailToSubscribers,
    getSubscriber,
    updateSubscriber
}
