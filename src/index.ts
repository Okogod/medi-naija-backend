import express from 'express';
import dotenv from 'dotenv';

import redisClient from './config/redis_config.js';

// Models
import mainModels from './models/main_model.js';

// Dotenv config
dotenv.config();

// Initialize models
mainModels();

const app = express();

const PORT = process.env.SERVER_PORT ?? 3000;



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
