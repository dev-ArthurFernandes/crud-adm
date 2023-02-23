import { Router } from "express";

import {
    createUserController,
    listUsersController,
    listUserController,
    updateUserController,
    deleteUserController
} from '../controllers';

import {
    checkPostEntries,
    validateEntries,
    validateUserId,
    validateEmail,
    ensureToken,
    validatePostEntries
} from '../middlewares';

const userRouter = Router()

userRouter.get("", ensureToken, listUsersController)
userRouter.get("/:id", ensureToken, validateUserId, listUserController)
userRouter.post("", validatePostEntries, checkPostEntries, validateEmail, createUserController)
userRouter.patch("/:id", ensureToken,validateUserId, validateEntries, validateEmail, updateUserController)
userRouter.put('/:id', ensureToken, validateUserId, validateEntries, checkPostEntries, validateEmail, updateUserController)
userRouter.delete('/:id', ensureToken, validateUserId, deleteUserController)

export default userRouter
