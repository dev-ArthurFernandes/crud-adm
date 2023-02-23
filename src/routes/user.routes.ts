import { Router } from "express";

import {
    createUserController,
    listUsersController,
    listUserController,
    updateUserController,
    deleteUserController
} from '../controllers';

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

userRouter.get("/user", listUsers)

export default userRouter