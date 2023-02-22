import { QueryResult } from "pg";
import { createUserSchema, returnUserSchema } from "../schemas";
import { z } from "zod";
import { boolean } from "zod/lib";

type IUserRequestSchema = z.infer<typeof createUserSchema>

type IUser = z.infer<typeof returnUserSchema>

type IUserWithoutPassword = Omit<IUser, 'password'>
type IUserResult = QueryResult<IUserWithoutPassword>
type IUserArray = Array<IUserResult>

type requiredKeys = 'name' | 'email' | 'password' | 'admin'
type newReqBodyArray = Array<IUserRequestSchema>

export {
    IUserRequestSchema,
    IUser,
    IUserWithoutPassword,
    IUserResult,
    IUserArray,
    requiredKeys,
    newReqBodyArray
}