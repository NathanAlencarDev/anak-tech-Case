import {prisma} from "../utils/prisma";
import { Client } from "@prisma/client";


export const createClientRepository = async (data: Omit<Client, "id" | "createdAt">): Promise<Client> => {
    return await prisma.client.create({data});
}

export const getAllClients = async (): Promise<Client[]> => {
    return await prisma.client.findMany({include: {allocations: true}});
}

export const getClientById = async (id: number): Promise<Client | null> => {
    return await prisma.client.findUnique({ where: {id}, include: {allocations: true}});
}

export const updateClient = async (id: number, data: Partial<Omit<Client, "id" | "createdAt">>): Promise<Client> =>{
    return await prisma.client.update({
        where: {id},
        data,
    });
};