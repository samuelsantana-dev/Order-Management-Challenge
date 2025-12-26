import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDatabase } from './config/database';
import { authRoutes } from "./routes/auth";
import { orderRoutes } from "./routes/order";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDatabase();

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));