import {FastifyRequest, FastifyReply} from "fastify";
import * as clientRepository from "../repositories/clients-repository";
import {createClientSchema} from "../validators/client.schema";
import { prisma } from '../utils/prisma';



export const createClient = async (req: FastifyRequest, res: FastifyReply) => {
    const convert = createClientSchema.safeParse(req.body);

    if(!convert.success) {
        return res.status(400).send({ error: convert.error.format() });
    }

    const client = await clientRepository.createClientRepository(convert.data);
    return res.status(201).send(client);
};

export const listClients = async (req: FastifyRequest, res: FastifyReply) => {
    const clients = await clientRepository.getAllClients();
    return res.send(clients);
};

export const showClient = async(req: FastifyRequest<{Params: {id: string}}>, res: FastifyReply) => {
    const id = parseInt(req.params.id);
    const client = await clientRepository.getClientById(id);

    if(!client) {
        return res.status(404).send({message: "Client not Found"});
    }

    return res.send(client);
}

export const updateClient = async (req: FastifyRequest<{Params: {id: string}}>, res: FastifyReply) => {
    const id = parseInt(req.params.id);
    const convert = createClientSchema.safeParse(req.body);

    if(!convert.success) {
        return res.status(400).send({error: convert.error.format()});
    }

    const client = await clientRepository.updateClient(id, convert.data);
    return res.send(client);
}

export async function deleteClient(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const clientId = parseInt(request.params.id)

    try {
        await prisma.client.delete({ where: { id: clientId } });
        return reply.status(204).send();
    } catch (error) {
        return reply.status(500).send({ message: 'Erro ao excluir cliente' });
    }
}