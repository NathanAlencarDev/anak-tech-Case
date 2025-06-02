// validators/assetSchema.ts
import { z as zod } from 'zod'

export const assetSchema = zod.object({
    name: zod.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    value: zod.number().positive('O valor deve ser um número positivo'),
})
