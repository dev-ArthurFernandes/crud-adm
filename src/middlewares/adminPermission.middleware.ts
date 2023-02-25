import { Request, Response, NextFunction } from 'express';
import { AppError } from '../error';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const validateAdminPermission = (req: Request, res: Response, next: NextFunction): void => {

    if(!req.user.admin){
        throw new AppError("Insufficient Permission", 403)
    }

    return next()
}

export default validateAdminPermission