const getErrorObject = (message,fieldName)=>{
    return {message:[{message:message,path:[fieldName]}]}
}

const commonError = (error,res)=>{
    console.log(error)
    if (error.message) res.status(400).send(error.message);
    else if (error) res.status(400).send(error);
    else res.status(400).send("error")
}

module.exports = {getErrorObject, commonError};