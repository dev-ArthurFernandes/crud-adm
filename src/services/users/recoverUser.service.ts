import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';
import { IUser } from '../../interfaces';

const recoverUserService =async (id: number): Promise<IUser> => {
    
    const queryString: string = `
        UPDATE
            users
        SET("active") = ROW(true)
        WHERE 
            users.id = $1
        RETURNING id, name, email, active, admin;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    return queryResult.rows[0]
}

export default recoverUserService