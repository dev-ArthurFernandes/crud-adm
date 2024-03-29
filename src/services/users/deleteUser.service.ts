import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';
import { IUserResult } from '../../interfaces';


const deleteUserService = async (id: number): Promise<IUserResult> => {

    const queryString = `
        UPDATE
            users
        SET("active") = ROW('false')
        WHERE
            users.id = $1
        RETURNING id, name, email, active, admin;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    return queryResult
}

export default deleteUserService