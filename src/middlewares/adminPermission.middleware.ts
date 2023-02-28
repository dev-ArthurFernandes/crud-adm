import { Request, Response, NextFunction } from 'express';
import { AppError } from '../error';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const validateAdminPermission = (req: Request, res: Response, next: NextFunction): void => {

    if(parseInt(req.params?.id) === req.user.id && !req.user.admin){
        return next()
    }

    if(parseInt(req.params?.id) === req.user.id && req.user.admin){
        return next()
    }

    if(parseInt(req.params?.id) !== req.user.id && !req.user.admin){
        throw new AppError("Insufficient Permission", 403)
    }

    if(!req.user.admin){
        throw new AppError("Insufficient Permission", 403)
    }

    if(req.user.admin){
        return next()
    }
}

export default validateAdminPermission