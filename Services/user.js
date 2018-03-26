const ResponseSend = require('../Boom/response.js')
const message = require('../Boom').errorMessage.eng
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {OAuth2Client} = require('google-auth-library');
const request = require('request');
module.exports={
    
checkMail: async (mail)=>{
    console.log(">>>>",mail)
    try{
        let a = await new Promise((resolve,reject)=>{
            connection.query(`SELECT * from user WHERE email=?`,[mail],(err,res)=>{
            if(err)
            return reject(err)
            else{
            return resolve(res);
             } })
        });
        
        return (a[0]) 
    }
    catch(err){
        return ResponseSend.sendError(err);
    }
},


checkPassword: async (body,password)=>{
    try{
        let a = bcrypt.compareSync(password,body.password);
        return a
    }
    catch(err){
        return ResponseSend.sendError(err);
    }
},

checkNumber: async (body)=>{
    try{
        let a = await new Promise((resolve,reject)=>{
            connection.query(`SELECT * FROM user WHERE phoneNumber = ?`,[body.phoneNumber],(err,res)=>{
            if(err)
            return reject(err)
            else{
            return resolve(res);
             } })
        });
        
        return a[0]
    }
    catch(err){
        return ResponseSend.sendError(err);
    }
},

addData: async (data)=>{
    let password = data.password;
            
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            
            data.password = hash;
            
            let dat = await connection.query(`INSERT INTO user SET ?`, data)
                
            return dat.values
  },


  socialsignin : async(token)=>{
      // facebook: 'https://graph.facebook.com/v2.10/me?access_token=',
// google: 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=',
//    let  verificationURI='https:www.googleapis.com/oauth2/v1/tokeninfo?access_token='+token
    const CLIENT_ID = '894829491932-b1e3b4pduha2imibomsrf8ev9ed3jrrp.apps.googleusercontent.com'
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      console.log("><>>>>ticket",payload)
    //   const userid = payload['sub'];
      // If request specified a G Suite domain:
      //const domain = payload['hd'];
    // }
    return verify().catch(console.error);


//     request(verificationURI, (error, response, body) => {

// console.log("errr",error,body,response);

//     })
  }
return(verify)
}
}