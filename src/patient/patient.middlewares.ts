// Types
import type { RowDataPacket } from "mysql2";

import type { Request, Response, NextFunction } from "express";

type ResultType = RowDataPacket & {
    patientid: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

// Mysql config
import conn from "../config/db_config.js";


// Check If User Exists
export const checkIfPatientExistMiddleware = ( table: string ) => {

    
    return ( req:Request, res: Response, next: NextFunction ) => {


        const { email } = req.body;

        let query;

        query = `SELECT * FROM ${table} WHERE email = ? LIMIT 1`;

        conn.query<ResultType[]>(query, [ email ], (error, result) => {

            if (error) {

                return res.status(500).json({ error: error.message })

            }

            if (result.length > 0) {

                return res.status(409).json({ error: `User with email ${email} already exists` })

            }

            
            next();

        })
    }

}