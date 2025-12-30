import express from 'express';
import "dotenv/config";
import cors from 'cors';
import { connectDatabase } from './config/database';
import { authRoutes } from "./routes/auth";
import { orderRoutes } from "./routes/order";
import { ErrorMiddleware } from './middlewares/error';


const app = express();
app.use(cors());
app.use(express.json());

connectDatabase();

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use(ErrorMiddleware);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));