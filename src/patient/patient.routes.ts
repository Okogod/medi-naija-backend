import { Router } from "express";

import DB_CONST from "../db_const/db_const.js";

// Middlewares
import {
    checkIfPatientExistMiddleware,
    checkIfPatientExistToSendForgotPasswordCodeMiddleware,
    verifyRegistrationCodeMiddleware,
    verifyForgotPasswordCodeMiddleware,
    SendVerificationCodeRateLimiterMiddlewre,
    ResendCodeRateLimiterMiddlewre,
    LoginRateLimitMiddleware,
    SendForgotPasswordCodeRateLimitMiddleware,
    CheckIfEmailHaveBeenVerifiedForForgotPassword
} from "./patient.middlewares.js";
import { ValidateRequestBody } from "../middlewares/global.middleware.js";


// Controllers
import { 
    SendRegistrationCodeController, 
    RegisterPatientController, 
    ResendRegistrationCodeController, 
    LoginPatientController, 
    SendForgotPasswordCodeController,
    ResendForgotPasswordCodeController,
    ResestPasswordController 
} from "./patient.controllers.js";

const PatientRouter = Router();

PatientRouter.post('/patient/send-registration-code', SendVerificationCodeRateLimiterMiddlewre, ValidateRequestBody, checkIfPatientExistMiddleware(DB_CONST.patients_table), SendRegistrationCodeController);

PatientRouter.post('/patient/verify-registration-code', ValidateRequestBody, verifyRegistrationCodeMiddleware(), RegisterPatientController);

PatientRouter.post('/patient/resend-registration-code', ResendCodeRateLimiterMiddlewre, ValidateRequestBody, ResendRegistrationCodeController );

PatientRouter.post( '/patient/login-patient', LoginRateLimitMiddleware, ValidateRequestBody, LoginPatientController );

PatientRouter.post( '/patient/send-forgot-password-code', SendForgotPasswordCodeRateLimitMiddleware, ValidateRequestBody, checkIfPatientExistToSendForgotPasswordCodeMiddleware(DB_CONST.patients_table), SendForgotPasswordCodeController );

PatientRouter.post( '/patient/verify-forgot-password-code',  ValidateRequestBody, verifyForgotPasswordCodeMiddleware(),  );

PatientRouter.post( '/pateinet/resend-forgot-password-code', ResendCodeRateLimiterMiddlewre, ValidateRequestBody, ResendForgotPasswordCodeController )

PatientRouter.post( '/patient/reset-password',  ValidateRequestBody, CheckIfEmailHaveBeenVerifiedForForgotPassword(), ResestPasswordController );



export default PatientRouter;