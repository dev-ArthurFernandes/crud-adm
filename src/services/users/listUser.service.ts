import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';
import { IUserResult } from '../../interfaces';


const listUserService = async (id: number): Promise<IUserResult> => {

    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            users.id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    return queryResult.rows[0]
}

export default listUserService