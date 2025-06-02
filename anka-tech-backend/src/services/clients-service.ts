import { ClientModel } from "../models/client-model";
import * as ClientRepository from "../repositories/clients-repository";
import * as HttpResponse from "../utils/http-helper";


export const getClientService = async () => {
    return ClientRepository.findAllClients();
}