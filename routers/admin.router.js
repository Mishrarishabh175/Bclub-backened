const Admin = require("../controllers/admin.controller")
const express = require("express")
const adminRouter = express()
const auth = require("../middleware/adminauth")

adminRouter.post("/addAdmin",auth.islogin,Admin.addAdmin)
adminRouter.post("/login",auth.islogout,Admin.verifyLogin)
adminRouter.get("/logout",auth.islogin,Admin.logout)
adminRouter.get("/",auth.islogin,Admin.getLogin)
module.exports = adminRouter