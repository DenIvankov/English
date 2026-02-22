import { z } from "zod";
export const registrationSchema = z
    .object({
        email: z.string().email("Некорректный email"),
        password: z.string().min(6, "Минимум 6 символов").regex(/[A-Z]/, "Должна быть заглавная буква").regex(/[0-9]/, "Должна быть цифра"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, { message: "Пароли не совпадают", path: ["confirmPassword"], });
export type RegistrationSchemaType = z.infer<typeof registrationSchema>;
