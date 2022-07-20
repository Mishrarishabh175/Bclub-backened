const express = require("express");
const subsciberRouter = express();
const Subscriber = require("../controllers/subscriber.controller")
const auth = require("../middleware/adminauth")



subsciberRouter.post("/",Subscriber.insertSubcriber)
subsciberRouter.delete("/:id",auth.islogin,Subscriber.deleteSubscriber)
subsciberRouter.put("/:id",auth.islogin,Subscriber.updateSubscriber)
subsciberRouter.get("/",auth.islogin,Subscriber.getSubscribers)
subsciberRouter.get("/:id",auth.islogin,Subscriber.getSubscriber)
subsciberRouter.post("/sendmail",auth.islogin,Subscriber.mailToSubscribers)

module.exports = subsciberRouter