const Admin = require("../models/admin.model")
const bcrypt = require("bcrypt")

const passwordHasher = async(password)=>{
    try {
        const hashedPassword = await bcrypt.hash(password,10)
        return hashedPassword
    } catch (error) {
        console.log(error.message)
    }
}

const comparePassword = async(password,hashedPassword)=>{
    try {
        const result = await bcrypt.compare(password,hashedPassword)
        return result
    } catch (error) {
        console.log(error.message)
    }
}

const addAdmin = async(req,res)=>{
    try {
        const hash = await passwordHasher(req.body.password)
        const admin = Admin({
            email:req.body.email,
            password:hash
        })
        const result = await admin.save()
        res.send("admin created successfully"); 
    } catch (error) {
        console.log(error.message)
    }
}
const verifyLogin = async(req,res)=>{
    try {
        const admin = await Admin.findOne({email:req.body.email})
        if(admin)
        {
            const result = await comparePassword(req.body.password,admin.password)
            if(result)
            {
                req.session.user_id = admin._id
            }
            
            res.send(result)
        }
        else{
            res.send(false)
        }
        
    } catch (error) {
        console.log(error.message)
    }
}
const logout = async(req,res)=>{
    try {
        req.session.destroy()
        res.send(true)
    } catch (error) {
        console.log(error.message)
    }
}
const getLogin = async(req,res)=>{
    try {
        res.send(true);
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    addAdmin,
    verifyLogin,
    logout,
    getLogin
}