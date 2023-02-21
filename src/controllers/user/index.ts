import {Request, Response} from 'express';
import { QueryResult } from 'pg';
import { client } from '../../database';

const listUsers = async (req: Request, res: Response): Promise<Response> => {

    const queryString: string = `
        SELECT
            *
        FROM
            users;
    `

    const queryResult: QueryResult = await client.query(queryString) 

    return res.status(200).json(queryResult.rows)
}

export {
    listUsers,
    
}