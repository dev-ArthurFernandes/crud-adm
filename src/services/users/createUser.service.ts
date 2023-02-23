import { compareSync } from 'bcryptjs';
import format from 'pg-format';
import { client } from '../../database';
import { IUserRequestSchema, IUserResult, IUserWithoutPassword } from '../../interfaces';
import { createUserSchema } from '../../schemas';

const createUserService = async (userData: IUserRequestSchema): Promise<IUserWithoutPassword> => {

    const validatedUserData = createUserSchema.parse(userData)

    const queryString: string = format(`
        INSERT INTO
            users(%I)
        VALUES(%L)
        RETURNING id, name, email, admin, active;
    `,
        Object.keys(validatedUserData),
        Object.values(validatedUserData)
    )

    const queryResult: IUserResult = await client.query(queryString)

    return queryResult.rows[0]
}

export default createUserService