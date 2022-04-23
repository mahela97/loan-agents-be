const {getAllLoans, addLoanType} = require("../../services/loanService");
const Joi = require("joi");
const {addFile} = require("../../services/storageService");
const {STORAGE} = require("../../constants/const");
module.exports ={
    getAllLoans:async(req,res)=>{
        try{
            const result = await getAllLoans();
            res.status(201).send({success: 1, result});
        }catch(error){
            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    },

    addLoanType:async (req, res)=>{
        const schema = Joi.object({
            loanName:Joi.string().required(),
        })

        const validate = schema.validate(req.body, {abortEarly: false})

        if (validate.error){
             res.status(400).send({message: validate.error.details})
             return;
        }

        const value = validate.value;

        try{
            const result = await addLoanType(value);
            if (result && req.file && result.loanId){
                await addFile(STORAGE.LOCATIONS.LOAN_ICONS,result.loanId,req.file);
            }
            res.status(201).send({success:1})

        }catch(error){

            if (error.message) res.status(400).send(error.message);
            else if (error) res.status(400).send(error);
        }
    }
}