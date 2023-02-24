import { QueryConfig, QueryResult } from 'pg';
import format from 'pg-format';
import { client } from '../../database';
import { IUserRequestSchema, IUserResult } from '../../interfaces';



const updateUserService = async (userData: IUserRequestSchema, id: number): Promise<IUserResult> => {

    const queryString = format(`
        UPDATE
            users(%I)
        VALEUS(%L)
        WHERE
            users.id = $1
        RETURNIN id, name, email, active, admin;
    `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    return queryResult.rows[0]
}

export default updateUserService