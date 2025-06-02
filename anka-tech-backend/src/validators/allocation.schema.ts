import * as zod from "zod";

export const allocationSchema = zod.object({
    clientId: zod.number(),
    assetId: zod.number(),
    value: zod.number().positive(),
});