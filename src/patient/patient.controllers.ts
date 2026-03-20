// Types
import type { Response, Request } from "express";
import type { userRegistrationType } from "../types/global.type.js";

// Services
import { 
    SendRegistrationCodeService, 
    ResendRegistrationCodeService, 
    ResendForgotPasswordCodeService,
    SendForgotPasswordCodeService,
} from "./patient.services.js";

// Repositories
import { 
    RegisterPatient, 
    LoginPatient, 
    ResetPassword 
} from "./patient.repositories.js";

// Redis
import redisClient from "../config/redis_config.js";

export const SendRegistrationCodeController = async (req: Request<{}, {}, userRegistrationType>, res: Response) => {

    try {

        await SendRegistrationCodeService(req.body);

        res.status(200).json({ message: `Registration Code Sent` });

    }
    catch (error: any) {

        res.status(500).json({ error: `INTERNAL SERVER ERROR: ${error.message}` });

    }

}

export const RegisterPatientController = async (req: Request<{}, {}, userRegistrationType>, res: Response) => {

    try{

        RegisterPatient(req.body);

        res.status(201).json({ message: `Account created successfully` })

    }catch( error: any ){
        
        return res.status(500).json({ error: error.message })
    }
    

}

export const ResendRegistrationCodeController = async ( req: Request<{}, {}, { email: string}>, res: Response ) => {

    try{
        const { email } = req.body;

        const data = await ResendRegistrationCodeService( email );

        res.status(200).json({ message: data });

    }catch( error ){

        res.status(500).json({ error })

    }
}

export const ResendForgotPasswordCodeController = async ( req: Request<{}, {}, { email: string}>, res: Response ) => {

    try{
        const { email } = req.body;

        const data = await ResendForgotPasswordCodeService( email );

        res.status(200).json({ message: data });

    }catch( error ){

        res.status(500).json({ error })

    }
}

export const LoginPatientController = async ( req: Request<{}, {}, {email:string, password: string}>, res: Response ) => {

    try{

        const { email, password } = req.body;

        const patient = await LoginPatient( email, password );

        if( patient.length == 0 ){

            return res.status(401).json({ error: "Invalid Email or Password" })
            
        }

        res.status(200).json({ patient: patient[0] })

    }catch( error ){

        res.status(500).json({ error })

    }

}

export const SendForgotPasswordCodeController = async (req: Request<{}, {}, { email: string }>, res: Response) => {

    try {

        await SendForgotPasswordCodeService(req.body.email);

        res.status(200).json({ message: `Forgot Password Code Sent` });

    }
    catch (error: any) {

        res.status(500).json({ error: `INTERNAL SERVER ERROR: ${error.message}` });

    }

}

export const ResestPasswordController = async ( req: Request<{}, {}, { email: string, newPassword: string }>, res: Response ) => {

    try{

        const { email, newPassword } = req.body;

        await ResetPassword( email, newPassword );

        await redisClient.DEL(`isVerified:${email}`)
        .catch( ( error ) => {

            return res.status(500).json({ error })
        })

        res.status(200).json({ message: `Password Reset Successful` });

    }catch( error: any ){

        return res.status(500).json({ error: error.message });

    }

}