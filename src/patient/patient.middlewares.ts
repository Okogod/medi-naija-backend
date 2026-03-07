// Types
import type { Request, Response, NextFunction } from "express";
import type { verifyRegistrationCodeRequestType } from "../types/global.type.js";


// Mysql config
import conn from "../config/db_config.js";

// Redis config
import redisClient from "../config/redis_config.js";

// Respositories
import { CheckIfUSerExists } from "./patient.repositories.js";


// Check If User Exists
export const checkIfPatientExistMiddleware =  (table: string) => {


    return async (req: Request<{}, {}, {email: string}>, res: Response, next: NextFunction) => {

        try{

            const { email } = req.body;

            const userExists = await CheckIfUSerExists( table, email );

            if( userExists ){

                return res.status(400).json({ error: `User already exists` });  
            
            }

            next();
        }
        catch( error: any ){
            return res.status(500).json({ error: error.message})
        }







    }

}


// Verify Registration Code
export const verifyRegistrationCodeMiddleware = () => {

    return (req: Request<{}, {}, verifyRegistrationCodeRequestType>, res: Response, next: NextFunction) => {

        const { email, code } = req.body;

        redisClient.hGetAll(`Verify:${email}`)
            .then((result) => {

                if (!result) {

                    return res.status(400).json({ error: `Invalid Registration Code` });

                }

                if (result.code !== code) {

                    return res.status(400).json({ error: `Invalid Registration Code` });

                }

                req.body = { firstname: result.firstname, lastname: result.lastname, email: result.email, password: result.password };

                redisClient.del(`Verify:${email}`)
                    .catch((error) => {
                        return res.status(500).json({ error: `INTERNAL SERVER ERROR: ${error.message}` });
                    })

                next();

            })
            .catch((error) => {
                res.status(500).json({ error: `INTERNAL SERVER ERROR: ${error.message}` })
            })

    }
}