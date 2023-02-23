import { Request, Response, NextFunction } from 'express';
import { AppError } from '../error';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const ensureToken =async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    let token = req.headers.authorization

    if(!token){
        throw new AppError("Missing Bearer Token", 401)
    }

    token = token.split(' ')[1]

    jwt.verify(token, String(process.env.SECRET_kEY), (error, decoded: any) => {

        if(error){
            throw new AppError(error.message, 401)
        }

        req.user = {
            id: parseInt(decoded.id),
            admin: decoded.admin
        }

        return next()
    })
    
}

export default ensureToken