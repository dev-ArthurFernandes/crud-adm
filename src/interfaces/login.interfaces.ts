import {createLoginSchema} from "../schemas";
import { z } from "zod";


type ILoginRequest = z.infer<typeof createLoginSchema>


export {
    ILoginRequest
}