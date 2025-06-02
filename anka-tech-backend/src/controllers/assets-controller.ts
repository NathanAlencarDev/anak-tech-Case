// controllers/staticAssetsController.ts
import { FastifyReply, FastifyRequest } from "fastify";
import * as staticAssetsRepository from "../repositories/assets-repository";

export const listStaticAssets = async (req: FastifyRequest, res: FastifyReply) => {
  const assets = staticAssetsRepository.getStaticAssets();
  return res.status(200).send(assets);
};
