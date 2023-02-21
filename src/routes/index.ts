import { Router } from "express";
import adressRouter from "./adress.routes";
import userRouter from "./user.routes";

const router = Router()

router.use('/users', userRouter)
router.use('/login', adressRouter)

export default router