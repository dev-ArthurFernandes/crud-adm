import {createLoginSchema} from "../schemas";
import { z } from "zod";


type ILoginRequest = z.infer<typeof createLoginSchema>

interface decode {
    admin: boolean,
    iat: number,
    exp: number,
    sub: string
}


export {
    ILoginRequest,
    decode
}