import fastify from "fastify";
import fastifyCors from '@fastify/cors'
import router from './routes';


async function createApp(){
    const app = fastify({logger: true});
    //const prisma = new PrismaClient();

    app.register(fastifyCors, {
        origin: 'http://localhost:3000', // ou '*' para liberar todos (menos seguro)
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })

    await app.register(router, { prefix: '/anka'});

    return app;
}


export default createApp;