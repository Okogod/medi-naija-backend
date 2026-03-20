import express from 'express';
import dotenv from 'dotenv';

import io from './config/socket.config.js';

// Models
import ModelInit from './models/model.init.js';


// Routes
import PatientRouter from './patient/patient.routes.js';

// Dotenv Config
dotenv.config();


// Execute Models
ModelInit();

// Express App
const app = express();

app.use(express.json());

app.use(PatientRouter);

const PORT = process.env.SERVER_PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
