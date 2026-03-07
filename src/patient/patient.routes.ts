import { Router } from "express";

import DB_CONST from "../db_const/db_const.js";

// Middlewares
import {
    checkIfPatientExistMiddleware,
    verifyRegistrationCodeMiddleware,
    SendVerificationCodeRateLimiterMiddlewre,
    ResendVerificationCodeRateLimiterMiddlewre
} from "./patient.middlewares.js";
import { ValidateRequestBody } from "../middlewares/global.middleware.js";


// Controllers
import { SendRegistrationCodeController, RegisterPatientController, ResendRegistrationCodeController } from "./patient.controllers.js";

const PatientRouter = Router();

PatientRouter.post('/patient/send-registration-code', SendVerificationCodeRateLimiterMiddlewre, ValidateRequestBody, checkIfPatientExistMiddleware(DB_CONST.patients_table), SendRegistrationCodeController);

PatientRouter.post('/patient/verify-registration-code', ValidateRequestBody, verifyRegistrationCodeMiddleware(), RegisterPatientController);

PatientRouter.post('/patient/resend-registration-code', ResendVerificationCodeRateLimiterMiddlewre, ValidateRequestBody, ResendRegistrationCodeController )

export default PatientRouter;