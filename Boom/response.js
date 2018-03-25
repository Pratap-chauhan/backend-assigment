const Boom = require('boom')

class ResponseSend{

    static sendSuccess(response) {
    const statusCode = (response && response.statusCode) || 200;

    //const message = (response && response.message) || configs.MessageConfiguration.get('/lang', { locale: headers['content-language'], message: 'SUCCESS' });
    const message = 'SUCCESS'
    // if(response && response.ops && response.ops.length > 0){
    //     response = response.ops[0]
    // }
        const data = response
    return { statusCode, message, data };
   };

   static sendError(errorData) {
    let error
    if(errorData.isBoom){
        error = errorData
    } else {
         error = Boom.badRequest('Inavlid credentials',errorData.errmsg)
    }
    return error
}    

}


module.exports = ResponseSend