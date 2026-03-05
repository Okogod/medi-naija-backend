import express from 'express';
import dotenv from 'dotenv';



// Dotenv config
dotenv.config();



const app = express();

app.use(express.json());

const PORT = process.env.SERVER_PORT ?? 3000;








app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
