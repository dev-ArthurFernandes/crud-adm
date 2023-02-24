import { QueryResult } from 'pg';
import { client } from '../../database';
import { IUserArray } from '../../interfaces';


const listUsersService = async (): Promise<IUserArray> => {

    const queryString: string = `
        SELECT
            id, name, email, active, admin
        FROM
            users;
    `

    const queryResult: QueryResult = await client.query(queryString)

    return queryResult.rows
}

export default listUsersService