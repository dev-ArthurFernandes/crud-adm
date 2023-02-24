import { Request, Response } from "express";
import { IUser, IUserRequestSchema, IUserResult } from "../interfaces";
import {
    listUsersService,
    createUserService,
    listUserService,
    updateUserService,
    deleteUserService,
    recoverUserService
} from "../services";


const createUserController =async (req: Request, res: Response): Promise<Response> => {
    
    const userData: IUserRequestSchema = req.body

    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
}

const listUsersController =async (req: Request, res: Response): Promise<Response> => {

    const listUser = await listUsersService()

    return res.status(200).json(listUser)
}

const listUserController =async (req: Request, res: Response): Promise<Response> => {
    
    const userId: number = req.user.id

    const user = await listUserService(userId)

    return res.status(200).json(user)
}

const updateUserController =async (req: Request, res: Response): Promise<Response> => {
    
    const userData: IUserRequestSchema = req.body

    const id: number = parseInt(req.params.id)

    const newUser = await updateUserService(userData, id)

    return res.status(200).json(newUser)
}

const deleteUserController =async (req: Request, res: Response): Promise<Response> => {
    
    const id: number = parseInt(req.params.id)

    await deleteUserService(id)

    return res.status(204).send({
        message: "Disabled user"
    })
}

const recoverUserController =async (req: Request, res: Response): Promise<Response> => {

    const id: number = parseInt(req.params.id)

    const user = await recoverUserService(id)

    return res.status(200).json(user)
}

export {
    createUserController,
    listUsersController,
    listUserController,
    updateUserController,
    deleteUserController,
    recoverUserController
}