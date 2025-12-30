import express from 'express';
import "dotenv/config";
import cors from 'cors';
import { connectDatabase } from './config/database';
import { router } from './routes/index';

const app = express();
app.use(cors());
app.use(express.json());

connectDatabase();

app.use(router);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));