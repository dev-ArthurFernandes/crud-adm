import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email().max(100),
    password: z.string().max(120).transform((pass) => {
        return hashSync(pass, 10)
    }),
    admin: z.boolean().optional()
})

const updateUserSchema = z.object({
    name: z.string().min(3).max(20).optional(),
    email: z.string().email().max(100).optional(),
    password: z.string().max(120).transform((pass) => {
        return hashSync(pass, 10)
    }).optional(),
    admin: z.boolean().optional()
})

const returnUserSchema = createUserSchema.extend({
    id: z.number(),
    active: z.boolean(),
    admin: z.boolean()
})

const returnUserSchemaWithoutPassword = returnUserSchema.omit({password: true})

export {
    createUserSchema,
    returnUserSchema,
    returnUserSchemaWithoutPassword,
    updateUserSchema
}