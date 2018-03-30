const async = require('async');
const ResponseSend = require('../Boom/response.js')
const message = require('../Boom').errorMessage.eng;
const services = require('../Services');
const jwt = require('jsonwebtoken');
const permissions = require('../user_detail/user_permissions.js').permissions;

module.exports = {
    register :async (body)=>{
        console.log(">>>>>>>>>",body)
        try{
            let status = await services.user.checkMail(body.email);
            if(status){
               return message.emailExit;
            }
            else{
                let check = await services.user.checkNumber(body)
                console.log("check",check)
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
                console.log("permissions",permissions,status)          
                const privatekey = 'pirates';
                const token = jwt.sign({id:status.id},privatekey);
                let obj={
                    token:token,
                    type:permissions[status.UserType],
                }
               
                return obj;
            }
        }}
        catch(err){
            return ResponseSend.errorMessage(err);
        }
        },
        socialsignin : async (token)=>{
            return await services.user.socialsignin(token);
        },


        getProfileDetail : async (body)=>{
            console.log(">>>>body",body)
            try{
                let status = await services.user.checkMail(body.email);
                // console.log(">>>>>status",status)
                if(status){
                    let userdetail={
                        message:"Successful",
                        data:{
                        DOB:status.DOB,
                        emai:status.email,
                        firstname:status.firstname,
                        lastname:status.lastname,
                        name:status.firstname+status.lastname,
                        phoneNumber:status.phoneNumber
                        }
                    }
                    return userdetail
                }
                else{
                  return  message.userNotFound
                }
            }
            catch(err){
                 return ResponseSend.errorMessage(err)
            }
        }
    
}