// Types
import type { Response, Request } from "express";
import type { userRegistrationType } from "../types/global.type.js";

// Services
import { SendRegistrationCodeService } from "./patient.services.js";

// Repositories
import { RegisterPatient } from "./patient.repositories.js";

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

        const { firstname, lastname, email, password } = req.body;

        RegisterPatient(req.body);

        res.status(201).json({ message: `Account created successfully` })

    }catch( error: any ){
        
        return res.status(500).json({ error: error.message })
    }
    

}