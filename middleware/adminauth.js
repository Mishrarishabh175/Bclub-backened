const islogin = async(req,res,next)=>{
    try {
        if(req.session.user_id)
        {
            next()
        }
        else{
            res.send(false)
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

const islogout = async(req,res,next)=>{
    try {
        if(req.session.user_id)
        {
            res.send(false)
        }
        else{
            next()
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports ={
    islogin,
    islogout
}