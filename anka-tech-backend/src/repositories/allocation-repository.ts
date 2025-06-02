import { prisma } from "../utils/prisma";

// Para criar uma alocação, recebe clientId, assetId e value
export const allocateAssets = async (clientId: number, assetId: number, value: number) => {
  return prisma.allocation.create({
    data: {
      clientId,
      assetId,
      value,
    },
  });
};

// Para buscar as alocações de um cliente, incluindo os dados do ativo relacionado
export const getClientAllocations = async (clientId: number) => {
  const allocations = await prisma.allocation.findMany({
    where: { clientId },
    include: {
      asset: true,
    },
  });

  return allocations.map(allocation => ({
    id: allocation.id,
    value: allocation.value,
    assetName: allocation.asset.name,
  }));
};
