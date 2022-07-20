const YoutubeSession = require("../models/youtubeSession.model")

const addYoutubeSession = async(req,res)=>{
    try {
        const youtubeSession = YoutubeSession({
            title:req.body.title,
            link:req.body.link,
            date:req.body.date
        })
        const result = await youtubeSession.save()
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
}

const getAllYoutubeSession = async(req,res)=>{
    try{
        const result = await YoutubeSession.find().sort({$natural:-1}).limit(10)
        res.send(result)
    }catch(error)
    {
        console.log(error.message)
    }
}

const deleteYoutubeSession = async(req,res)=>{
    try {
        const result = await YoutubeSession.deleteOne({_id:req.params.id})
        res.send(result)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    addYoutubeSession,
    getAllYoutubeSession,
    deleteYoutubeSession
}