import { Router } from "express";

import DB_CONST from "../db_const/db_const.js";

// Middlewares
import {
    checkIfPatientExistMiddleware,
    verifyRegistrationCodeMiddleware,
    SendVerificationCodeRateLimiterMiddlewre,
    ResendVerificationCodeRateLimiterMiddlewre,
    LoginRateLimitMiddleware
} from "./patient.middlewares.js";
import { ValidateRequestBody } from "../middlewares/global.middleware.js";


// Controllers
import { SendRegistrationCodeController, RegisterPatientController, ResendRegistrationCodeController, LoginPatientController } from "./patient.controllers.js";

const PatientRouter = Router();

PatientRouter.post('/patient/send-registration-code', SendVerificationCodeRateLimiterMiddlewre, ValidateRequestBody, checkIfPatientExistMiddleware(DB_CONST.patients_table), SendRegistrationCodeController);

PatientRouter.post('/patient/verify-registration-code', ValidateRequestBody, verifyRegistrationCodeMiddleware(), RegisterPatientController);

PatientRouter.post('/patient/resend-registration-code', ResendVerificationCodeRateLimiterMiddlewre, ValidateRequestBody, ResendRegistrationCodeController );

PatientRouter.post( '/patient/login-patient', LoginRateLimitMiddleware, ValidateRequestBody, LoginPatientController )

export default PatientRouter;