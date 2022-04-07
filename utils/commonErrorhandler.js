const getErrorObject = (message,fieldName)=>{
    return {message:[{message:message,path:[fieldName]}]}
}

module.exports = getErrorObject;