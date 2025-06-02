import fastify, { FastifyInstance } from 'fastify';
import * as ClientsController from './controllers/clients-controller';
import * as allocationsController from './controllers/allocations-controller';
import * as staticAssetsController from "./controllers/assets-controller";
import { staticAssets } from './data/staticAssets';


export default async function router(router: FastifyInstance) {
    //! Clients
    router.post("/clients", ClientsController.createClient);
    router.get("/clients", ClientsController.listClients);
    router.get("/clients/:id", ClientsController.showClient);
    router.put("/clients/:id", ClientsController.updateClient);
    router.delete("/clients/:id", ClientsController.deleteClient);
    router.get("/clients/:clientId/allocations", allocationsController.listByClient);

    //!allocations
    router.post("/allocations", allocationsController.createAllocation);
    router.get("/allocations/:clientId", allocationsController.listByClient);
    router.get("/staticassets", staticAssetsController.listStaticAssets);
}