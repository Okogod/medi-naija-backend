import express from 'express';
import dotenv from 'dotenv';

// Models
import ModelInit from './models/model.init.js';


// Routes
import PatientRouter from './patient/patient.routes.js';

// Dotenv config
dotenv.config();


// Execute Models
ModelInit();




const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Patient Management API' });
});

app.use(express.json());

app.use(PatientRouter);

const PORT = process.env.SERVER_PORT ?? 3000;



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
