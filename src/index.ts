import express from 'express';
import dotenv from 'dotenv';

import conn from './config/db_config.js';

dotenv.config();

const app = express();

const PORT = process.env.SERVER_PORT ?? 3000;



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
