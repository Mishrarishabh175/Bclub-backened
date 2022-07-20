const Event = require("../controllers/event.controller")
const express = require('express')
const eventRouter =express()
const multer = require("multer")
const path = require("path")
const auth = require("../middleware/adminauth")

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/eventImages"))
    },
    filename:function(req,file,cb){
        const name = Date.now()+"-"+file.originalname;
        cb(null,name)
    }
})

const upload = multer({storage:storage})

eventRouter.post("/add",auth.islogin,upload.array('images',12),Event.addEvent)
eventRouter.delete("/:id",auth.islogin,Event.deleteEvent)
eventRouter.get("/",Event.getEvents)
eventRouter.get("/:id",Event.getEvent)
eventRouter.get("/image/:filename",Event.getImage)
eventRouter.post("/add/image",auth.islogin,upload.single('image'),Event.addImage)


module.exports = eventRouter