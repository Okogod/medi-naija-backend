import { Router } from "express";

import DB_CONST from "../db_const/db_const.js";

// Middlewares
import { checkIfPatientExistMiddleware } from "./patient.middlewares.js";
import { ValidateRequestBody } from "../middlewares/global.middleware.js";
import { verifyRegistrationCodeMiddleware } from "./patient.middlewares.js";


// Controllers
import { SendRegistrationCodeController } from "./patient.controllers.js";
import { RegisterPatientController } from "./patient.controllers.js";

const PatientRouter = Router();

PatientRouter.post( '/patient/send-registration-code', ValidateRequestBody, checkIfPatientExistMiddleware(DB_CONST.patients_table), SendRegistrationCodeController );

PatientRouter.post( '/patient/verify-registration-code', ValidateRequestBody, verifyRegistrationCodeMiddleware(), RegisterPatientController );

export default PatientRouter;