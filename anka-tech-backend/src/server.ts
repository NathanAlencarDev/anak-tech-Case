import fastify from "fastify";
import createApp from "./app";
import router from './routes';


async function startServer(){

    const app = await createApp();
    app.listen({port: 3333, host: '0.0.0.0'}).then(() =>{
        console.log('✅ Servidor iniciado em http://localhost:3333/anka');
    });
}

startServer();


