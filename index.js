const express = require("express")
const mongoose = require("mongoose")
const app = express();
const cors = require("cors")
const subcriberRouter = require("./routers/subscriber.router")
const presidentRouter = require("./routers/President.router")
const adminRouter = require("./routers/admin.router")
const youtubeSessionRouter = require("./routers/youtubeSession.router")
const eventRouter = require("./routers/event.router")
require('dotenv').config();
const session = require("express-session")

const sessionSecret = process.env.sessionSecret
app.use(session({
    secret:sessionSecret,
    saveUninitialized:false,
    resave:false
}))


const port =process.env.PORT
const uri = process.env.uri
mongoose.connect(uri,()=>{
    console.log("Database connection stablished")
})
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.send("working ")
})

app.use("/subscribe",subcriberRouter)
app.use("/president",presidentRouter)
app.use("/admin",adminRouter)
app.use("/youtube",youtubeSessionRouter)
app.use("/event",eventRouter)

app.listen(port,()=>{
    console.log("Server is running...")
})