const YoutubeSession = require("../controllers/youtubeSession.controller")
const express = require("express")
const youtubeSessionRouter = express()
const auth = require("../middleware/adminauth")

youtubeSessionRouter.get("/",YoutubeSession.getAllYoutubeSession)
youtubeSessionRouter.post("/add",auth.islogin,YoutubeSession.addYoutubeSession)
youtubeSessionRouter.delete("/delete",auth.islogin,YoutubeSession.deleteYoutubeSession)

module.exports = youtubeSessionRouter
