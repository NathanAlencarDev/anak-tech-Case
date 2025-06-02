import * as zod from "zod";

export const createClientSchema = zod.object({
    name: zod.string().min(3),
    email: zod.string().email(),
    status: zod.boolean()
});