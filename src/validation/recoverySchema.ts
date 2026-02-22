import { z } from "zod"
export const recoverySchema = z.object({
    recoveryEmail: z
        .string()
        .trim()
        .toLowerCase()
        .email("Введите корректный email"),
});
export type RecoverySchemaType = z.infer<typeof recoverySchema>