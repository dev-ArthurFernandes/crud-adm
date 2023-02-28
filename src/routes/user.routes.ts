import { Router } from "express";

import {
    createUserController,
    listUsersController,
    listUserController,
    updateUserController,
    deleteUserController,
    recoverUserController
} from '../controllers';

import {
    checkPostEntries,
    validateUserId,
    validateEmail,
    ensureToken,
    validatePostEntries,
    validateAdminPermission,
    userActive,
    validateEntreis
} from '../middlewares';

import {
    createUserSchema,
    updateUserSchema
} from "../schemas";


const userRouter = Router()

userRouter.get("", ensureToken, userActive, validateAdminPermission, listUsersController)
userRouter.get("/profile", ensureToken, userActive, listUserController)
userRouter.post("", validatePostEntries, validateEntreis(createUserSchema), checkPostEntries, validateEmail, createUserController)
userRouter.patch("/:id", ensureToken, userActive, validateAdminPermission, validateEntreis(updateUserSchema), validateEmail, updateUserController)
userRouter.put('/:id/recover', ensureToken, userActive, validateAdminPermission, validateUserId, recoverUserController)
userRouter.delete('/:id', ensureToken, userActive, validateAdminPermission, validateUserId, deleteUserController)

export default userRouter
