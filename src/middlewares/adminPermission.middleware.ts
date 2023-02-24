import { Request, Response, NextFunction } from 'express';
import { AppError } from '../error';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const validateAdminPermission = (req: Request, res: Response, next: NextFunction): void => {

    let token = req.headers.authorization

    if(!token){
        throw new AppError("Missing Bearer token", 401)
    }

    token = token.split(' ')[1] 

    jwt.verify(token, String(process.env.SECRET_kEY), (error, decode: any) => {
        
        const admin: boolean = decode.admin

        if(error){
            throw new AppError(error.message, 401)
        }

        if(!admin){
            throw new AppError("Insufficient Permission", 403)
        }

    })

    return next()
}

export default validateAdminPermission