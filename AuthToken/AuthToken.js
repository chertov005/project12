const jwt = require('jsonwebtoken') ;
const {keyToken} = require('../config/secret');



exports.genToken = (_id ,role) => {

    let token = jwt.sign({_id ,role} ,keyToken.key , {expiresIn:'60mins'}) ;
    return token;

};



exports.authToken = async(req , res ,next) => {

    let checkSentToken = req.header('x-api-key') ;
    if(!checkSentToken) {
        return res.status(401).json({message:'no sent token'})
    };


    try {
      
        let decodeToken = jwt.verify(checkSentToken,keyToken.key) ;

        req.tokenData = decodeToken ;

        console.log(req.tokenData)

        next()
        

    } catch (error) {
        return res.status(401).json({message:'token invalid or expired'});
    }

};