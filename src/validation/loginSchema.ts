import { z } from "zod"
export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Введите корректный email"),
    password: z.string()


})
export type LoginSchemaType = z.infer<typeof loginSchema>