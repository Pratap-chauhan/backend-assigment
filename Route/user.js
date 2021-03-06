const Joi = require('joi');
const controller  = require('../Controller');
const ResponseSend = require('../Boom/response.js')
const request = require('request');

module.exports = [
    {  
        method: 'POST',
        path: '/customer/register',
        handler: async (request)=> {
            // console.log("><><><><",request)
            try{
                return await controller.user.register(request.payload);
            }
            catch(err){
                return ResponseSend.sendError(err);
            }
        },
        config: {
            description: 'Register form',
            notes: 'Returns all the credentials of the user',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            }, 
            validate: {
                payload: {
                    name: Joi.string().error(new Error('name is not valid')).required(),
                    lastname:Joi.string().error(new Error('name is not valid')),
                    email: Joi.string().email().min(4).max(30).error(new Error('Email is not valid')).required(),
                    password: Joi.string().min(4).max(15).error(new Error('Password must be 4 to 15 characters long')).required(),
                    phoneNumber: Joi.number().min(10).error(new Error('Number must be 10 characters long')).required(),
                    DOB: Joi.date().error(new Error('DOB is not valid'))                
                }
            }
        }
    },
    {
    method: 'POST',
    path: '/user/signin',
    handler: async (request)=>{
        // console.log("><><><><<")
        try{
            return controller.user.signin(request.payload);
        }
        catch(err){
            return ResponseSend.sendError(err);
        }
    },
    config: {
        description: 'Signin form',
        notes: 'Returns the Access token ',
        tags: ['api'],
        // config: {
            // cors: {
            //     origin: ['*'],
            //     additionalHeaders: ['cache-control', 'x-requested-with']
            // },
        // },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        }, 
        validate: {
            payload: {
                email: Joi.string().email().min(5).max(30).required(),
                password: Joi.string().error(new Error('Password must be 4 to 15 characters long')).min(5).max(15).required()
                 }
        }
    },
    
},
{
    method: 'POST',
    path: '/user/socialsignin',
    handler: async (request)=>{
        try{
            return controller.user.socialsignin(request.headers.token);
        }
        catch(err){
            return ResponseSend.sendError(err);
        }
    },
    config: {
        description: 'Signin form',
        notes: 'Returns the Access token ',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        }, 
        validate: {
            headers: Joi.object({
                'token': Joi.string().required()
            }).unknown()
        }
    },
    
},
{
    method: 'POST',
    path: '/user/getProfileDetail',
    handler: async (request)=>{
        console.log(">>>>>>>>>email",request.payload)
        try{
            return controller.user.getProfileDetail(request.payload);
        }
        catch(err){
            return ResponseSend.sendError(err);
        }
    },
    config: {
        description: 'Profile Detail',
        notes: 'Returns the Profile Detail ',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        }, 
        validate: {
            payload: {
                email: Joi.string().email().min(5).max(30).required()
            }
        }
    },
    
},
]

// facebook: 'https://graph.facebook.com/v2.10/me?access_token=',
// google: 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=',
