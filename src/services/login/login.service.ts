import { QueryConfig } from 'pg';
import { ILoginRequest } from '../../interfaces';
import { client } from '../../database';
import { AppError } from '../../error';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const loginService =async (loginData: ILoginRequest): Promise<string> => {

    let queryString = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `

    let queryConfig: QueryConfig = {
        text: queryString,
        values: [loginData.email]
    }

    let queryResult = await client.query(queryConfig)

    if(!queryResult.rowCount){
        throw new AppError("Wrong email or password", 401)
    }

    const mathPassword: boolean = await compare(loginData.password, queryResult.rows[0].password)

    if(!mathPassword){
        throw new AppError("Wrong email or password", 401)
    }
    
    const token: string = jwt.sign(
        {
            admin: queryResult.rows[0].admin
        },
        String(process.env.SECRET_kEY),
        {
            expiresIn: '24h',
            subject: queryResult.rows[0].id
        }
    )

    return token
}

export default loginService