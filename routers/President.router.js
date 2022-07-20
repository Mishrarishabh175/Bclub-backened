const express = require("express")
const presidentRouter = express()
const President = require("../controllers/president.controller")
const path = require("path")
const multer = require("multer")
const auth = require("../middleware/adminauth")

const storage = multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,path.join(__dirname,"../public/presidentImages"))
    },
    filename:function(req,file,cb){
        const name = Date.now()+"-"+file.originalname
        cb(null,name)
    }
})
const upload = multer({storage:storage})


presidentRouter.get("/",President.getPresidents)
presidentRouter.post("/",auth.islogin,upload.single('image'),President.addPresident)
presidentRouter.get("/image/:id",President.getPresidentImage)

module.exports= presidentRouter