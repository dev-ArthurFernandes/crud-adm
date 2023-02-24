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
    validateEntries,
    validateUserId,
    validateEmail,
    ensureToken,
    validatePostEntries,
    validateAdminPermission,
    userActive
} from '../middlewares';

const userRouter = Router()

userRouter.get("", ensureToken, userActive, validateAdminPermission, listUsersController)
userRouter.get("/profile", ensureToken, userActive, validateAdminPermission, listUserController)
userRouter.post("", validatePostEntries, checkPostEntries, validateEmail, createUserController)
userRouter.patch("/:id", ensureToken, userActive, validateUserId, validateEntries, validateEmail, updateUserController)
userRouter.put('/:id/recover', ensureToken, userActive, validateAdminPermission, validateUserId, recoverUserController)
userRouter.delete('/:id', ensureToken, userActive, validateAdminPermission, validateUserId, deleteUserController)

export default userRouter