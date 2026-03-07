import rateLimit from 'express-rate-limit';
import redisClient from '../config/redis_config.js';

// Types
import type { Request, Response, NextFunction } from "express";
import type { verifyRegistrationCodeRequestType } from "../types/global.type.js";

// Service
import { VerifyRegistrationCodeService } from './patient.services.js';

// Respositories
import { CheckIfUSerExists } from "./patient.repositories.js";


// ===== Rate Limit Middlewares =====

export const ResendVerificationCodeRateLimiterMiddlewre = rateLimit({
    windowMs: 60 * 15 * 1000,
    max: 5,
    handler: (req: Request, res: Response) => {
        res.status(429).json({ error: `Too many requests, please try again after 15 minutes` });
    }
});

export const SendVerificationCodeRateLimiterMiddlewre = rateLimit({
    windowMs: 60 * 15 * 1000,
    max: 3,
    handler: (req: Request, res: Response) => {
        res.status(429).json({ error: `Too many requests, please try again after 15 minutes` });
    }
});


// Check If User Exists
export const checkIfPatientExistMiddleware = (table: string) => {


    return async (req: Request<{}, {}, { email: string }>, res: Response, next: NextFunction) => {

        try {

            const { email } = req.body;

            const userExists = await CheckIfUSerExists(table, email);

            if (userExists) {

                return res.status(400).json({ error: `User already exists` });

            }

            next();
        }
        catch (error: any) {

            return res.status(500).json({ error: error.message })

        }
    }

}


// Verify Registration Code
export const verifyRegistrationCodeMiddleware = () => {

    return async (req: Request<{}, {}, { firstname: string, lastname: string, email: string, password: string, code?: string }>, res: Response, next: NextFunction) => {

        try {

            const { email, code } = req.body;

            if (code) {

                const result = await VerifyRegistrationCodeService(email, code) as verifyRegistrationCodeRequestType;

                req.body = await { firstname: result.firstname, lastname: result.lastname, email: result.email, password: result.password }

                redisClient.del(`Verify:${email}`)
                    .catch((error) => {

                        return res.status(500).json({ error: `INTERNAL SERVER ERROR: ${error.message}` });

                    })

                next();
            }


        } catch (error) {

            return res.status(500).json({ error })

        }



    }
}