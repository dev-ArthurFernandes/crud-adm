import { Response, Request, NextFunction, query } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from '../database'
import { AppError } from "../error";
import { requiredKeys } from "../interfaces";
import { newReqBodyArray } from "../interfaces/users.interfaces";

const validateUserId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const id: number = parseInt(req.params.id)

    const queryString: string = `
        SELECT
            *
        FROM 
            users
        WHERE
            users.id = $1;
    `

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult = await client.query(QueryConfig)
    
    if(!queryResult.rowCount){
        throw new AppError('User not found!', 404)
    }

    return next()
}

const validateEntries = (req: Request, res: Response, next: NextFunction): Response | void => {

    const entries = Object.entries(req.body)

    const requiredKeys: Array<requiredKeys> = ["name", "email", "password"]

    let newReqBodyArray: Array<newReqBodyArray> = []

    entries.map((item: any) => {
        if(requiredKeys.includes(item[0])){
            newReqBodyArray.push(item)
        }
    })

    if(newReqBodyArray.length < 1){
        throw new AppError("You forgot a required key: name, email or password")
    }

    req.body = Object.fromEntries(newReqBodyArray)

    return next()
}

const validatePostEntries = (req: Request, res: Response, next: NextFunction): Response | void => {

    const entries = Object.entries(req.body)

    const requiredKeys: Array<requiredKeys> = ["name", "email", "password", "admin"]

    let newReqBodyArray: Array<newReqBodyArray> = []

    entries.map((item: any) => {
        if(requiredKeys.includes(item[0])){
            newReqBodyArray.push(item)
        }
    })
    
    if(newReqBodyArray.length < 3){
        throw new AppError("You forgot a required key: name, email, password or admin")
    }

    req.body = Object.fromEntries(newReqBodyArray)
    
    return next()
}

const checkPostEntries = (req: Request, res: Response, next: NextFunction): Response | void => {

    const entriesKeys: Array<string> = Object.keys(req.body)

    if(entriesKeys.length < 3){
        throw new AppError("You forgot a required key: name, email, password or admin")
    }
    return next()
}

const validateEmail =async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    
    const email: string = req.body.email

    const queryString = `
        SELECT  
            *
        FROM
            users
        WHERE   
            users.email = $1;
    `

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [email]
    }

    const queryResult: QueryResult = await client.query(QueryConfig)

    if(queryResult.rowCount){
        throw new AppError("Email already registered", 409)
    }

    return next()
}

const userActive =async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    
    const id: number = req.user.id

    const queryString: string = `
        SELECT
            *
        FROM
            users u
        WHERE
            u.id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    if(!queryResult.rows[0].active){
        throw new AppError("Disabled user", 401)
    }

    return next()
}

export {
    validateUserId,
    validateEntries,
    checkPostEntries,
    validateEmail,
    validatePostEntries,
    userActive
}