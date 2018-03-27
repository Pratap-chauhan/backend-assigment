const Hapi = require('hapi');
const routes = require('./Route');
const connection =require('./dbconnection.js');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const server = Hapi.server({ port: 3010, host: 'localhost', routes: { cors: true }  });

const options = {
    info:{
        'title': 'API documentation',
    }
}


const init = async () => {
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger
        }
    ]);
    try{
       await connection.connection;
    //    console.log("list of routes ",routes)
       server.route(routes)
        await server.start();

        }
        catch(err){
            throw err
        }
    console.log(`Server running at: ${server.info.uri}`);

}

init();

