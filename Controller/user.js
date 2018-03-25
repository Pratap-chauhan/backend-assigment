const async = require('async');
const ResponseSend = require('../Boom/response.js')
const message = require('../Boom').errorMessage.eng;
const services = require('../Services');
const jwt = require('jsonwebtoken');

module.exports = {
    register :async (body)=>{
        try{
            let status = await services.user.checkMail(body.email);
            
            if(status){
               return message.emailExit;
            }
            else{
                let check = await services.user.checkNumber(body)
                
                    if(check){
                        return message.numberExist;
                    }
                    const response = await services.user.addData(body);
            
                    return ResponseSend.sendSuccess(response);
            }  
        }
        catch(err){
            return ResponseSend.sendError(err);
        }
        
    },

    signin : async(body)=>{
        try{
            let status = await services.user.checkMail(body.email);
            if(!status){
                return message.userNotFound
            }
            else {
            let check = await services.user.checkPassword(status,body.password);
            if(!check){
                return message.invalidCredentials;
            }
            else{             
                const privatekey = 'pirates';
                const token = jwt.sign({id:status.id},privatekey)
                return ResponseSend.sendSuccess(token);
            }
        }}
        catch(err){
            return ResponseSend.errorMessage(err);
        }
        },

        socialsignin : async (token)=>{
            return await services.user.socialsignin(token);
        }
}