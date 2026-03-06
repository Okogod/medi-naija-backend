import { Router } from "express";

import DB_CONST from "../db_const/db_const.js";

// Middlewares
import { checkIfPatientExistMiddleware } from "./patient.middlewares.js";
import { ValidateRequestBody } from "../middlewares/global.middleware.js";


// Controllers
import { SendRegistrationCodeController } from "./patient.controllers.js";

const PatientRouter = Router();

PatientRouter.post( '/patient/send-registration-code', ValidateRequestBody, checkIfPatientExistMiddleware(DB_CONST.patients_table), SendRegistrationCodeController );

export default PatientRouter;