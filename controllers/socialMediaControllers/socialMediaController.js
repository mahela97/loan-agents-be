const {getAllSocialMedias} = require("../../services/socialMediaService");
module.exports ={
    getAllSocialMedias:async (req,res)=>{
        try{
            const result = await getAllSocialMedias();
            res.status(201).send({success: 1, data: {socialMedias: result}});
        }catch(error){
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    }
}