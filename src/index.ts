import express from 'express';
import dotenv from 'dotenv';


// Models
import mainModels from './models/main_model.js';

// Dotenv config
dotenv.config();


// Initialize models
mainModels();


//  ===== User Routes =====
import user_auth_router from './routes/user_routes/user_authentication_routes/register_route.js';



const app = express();

app.use(express.json());

const PORT = process.env.SERVER_PORT ?? 3000;


app.use( user_auth_router );






app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
