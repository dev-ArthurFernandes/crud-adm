import { Router } from "express";
import {
    listUsers,
} from '../controllers'

const userRouter = Router()

userRouter.get("/user", listUsers)

export default userRouter