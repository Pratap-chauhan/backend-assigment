const Boom = require('boom')

module.exports = {

    errorMessage: {
        eng: {
            emailExit: Boom.conflict("Email Already exist"),
            invalidCredentials: Boom.unauthorized("Invalid Credentials"),
            userNotFound: Boom.unauthorized("User Not found"),
            jobexist: Boom.conflict("job Already exist"),
            nojob: Boom.badRequest('User has not assigned any job'),
            notassigned: Boom.notFound('this job is not assigned to user'),
            token: Boom.unauthorized("Inavlid token"),
            numberExist: Boom.conflict("Number Already exist"), 
            numberNotExist: Boom.notFound('Number not found'),
            invalidOTP: Boom.unauthorized("Invalid OTP")
        }
    }
}