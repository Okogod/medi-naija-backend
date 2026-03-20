import rateLimit from 'express-rate-limit';
import redisClient from '../config/redis_config.js';

// Types
import type { Request, Response, NextFunction } from "express";
import type { verifyRegistrationCodeRequestType } from "../types/global.type.js";

// Service
import { VerifyRegistrationCodeService, VerifyForgotPasswordCodeService } from './patient.services.js';

// Respositories
import { CheckIfPatientExists } from "./patient.repositories.js";


// ===== Rate Limit Middlewares =====

export const ResendCodeRateLimiterMiddlewre = rateLimit({
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

export const LoginRateLimitMiddleware = rateLimit({
    windowMs: 60 * 15 * 1000,
    max: 5,
    handler: (req: Request, res: Response) => {
        res.status(429).json({ error: `Too many requests, please try again after 15 minutes` });
    }
})

export const SendForgotPasswordCodeRateLimitMiddleware = rateLimit({
    windowMs: 60 * 15 * 1000,
    max: 5,
    handler: (req: Request, res: Response) => {
        res.status(429).json({ error: `Too many requests, please try again after 15 minutes` });
    }
})


// Check If User Exists
export const checkIfPatientExistMiddleware = (table: string) => {


    return async (req: Request<{}, {}, { email: string }>, res: Response, next: NextFunction) => {

        try {

            const { email } = req.body;

            const userExists = await CheckIfPatientExists(table, email);

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

// Check If User Exists
export const checkIfPatientExistToSendForgotPasswordCodeMiddleware = (table: string) => {


    return async (req: Request<{}, {}, { email: string }>, res: Response, next: NextFunction) => {

        try {

            const { email } = req.body;

            const userExists = await CheckIfPatientExists(table, email);

            if (!userExists) {

                return res.status(400).json({ error: `User does not exist` });

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


// Verify Forgot Password Code
export const verifyForgotPasswordCodeMiddleware = () => {

    return async (req: Request<{}, {}, { email: string, code: string }>, res: Response, next: NextFunction) => {

        try {

            const { email, code } = req.body;

            if (code) {

                const result = await VerifyForgotPasswordCodeService(email, code) as { email: string, code: string };


                await res.status(200).json({ message: `Password reset code verified successfully` });

                redisClient.del(`ForgotPassword:${email}`)
                    .catch((error) => {

                        return res.status(500).json({ error: `INTERNAL SERVER ERROR: ${error.message}` });

                    })

                redisClient.SET(`isVerified:${email}`, 'true',)
                    .catch((error) => {

                        return res.status(500).json({ error: `INTERNAL SERVER ERROR: ${error.message}` });
                    })

            }


        } catch (error) {

            return res.status(500).json({ error })

        }



    }
}


// Check If Email Has Been Verified For Forgot Password
export const CheckIfEmailHaveBeenVerifiedForForgotPassword = () => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {

            const { email } = req.body;

            const isVerified = await redisClient.GET(`isVerified:${email}`);

            if (isVerified != "true") {
                return res.status(401).json({ error: "Email has not been verified" });
            }

            next();

        } catch (error) {

            return res.status(500).json({ error })

        }



    }

}