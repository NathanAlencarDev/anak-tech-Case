import { FastifyReply, FastifyRequest } from "fastify";
import * as allocationRepository from "../repositories/allocation-repository";
import { allocationSchema} from "../validators/allocation.schema";

export const createAllocation = async (req: FastifyRequest, res: FastifyReply) => {
  const convert = allocationSchema.safeParse(req.body);

  if (!convert.success) {
    return res.status(400).send({ error: convert.error.format() });
  }

  try {
    const { clientId, assetId, value } = convert.data;
    const allocation = await allocationRepository.allocateAssets(clientId, assetId, value);
    return res.status(201).send(allocation);
  } catch (error) {
    console.error('Erro ao criar alocação:', error);
    return res.status(500).send({ error: 'Erro interno ao criar alocação' });
  }
};

export const listByClient = async (req: FastifyRequest<{Params: {clientId: string}}>, res: FastifyReply) =>{
    const clientId = parseInt(req.params.clientId);

    if (isNaN(clientId)){
        return res.status(400).send({error: "clientId must be a number"});
    }

    const allocations = await allocationRepository.getClientAllocations(clientId);
    return res.status(200).send(allocations);
}
