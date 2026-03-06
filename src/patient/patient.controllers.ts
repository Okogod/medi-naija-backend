// Types
import type { Response, Request } from "express";
import type { userRegistrationType } from "../types/global.type.js";

// Services
import { SendRegistrationCodeService } from "./patient.services.js";

export const SendRegistrationCodeController = async (req: Request<{}, {}, userRegistrationType>, res: Response) => {

    try {

        await SendRegistrationCodeService(req.body);

        res.status(200).json({ message: `Registration Code Sent` });

    }
    catch (error: any) {

        res.status(500).json({ error: `INTERNAL SERVER ERROR: ${error.message}` });

    }

}