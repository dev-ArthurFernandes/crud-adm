import { QueryConfig, QueryResult } from 'pg';
import format from 'pg-format';
import { client } from '../../database';
import { IUserRequestSchema, IUserResult } from '../../interfaces';
import { updateUserSchema } from '../../schemas/users.schemas';



const updateUserService = async (userData: IUserRequestSchema, id: number): Promise<IUserResult> => {

    const validatedUserData = updateUserSchema.parse(userData)

    const queryString: string = format(`
        UPDATE
            users
        SET(%I) = ROW(%L)
        WHERE
            users.id = $1
        RETURNING id, name, email, active, admin;
    `,
        Object.keys(validatedUserData),
        Object.values(validatedUserData)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    return queryResult.rows[0]
}

export default updateUserService