import express, { Express } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { rocketRoute } from './routes/rocket.routes';
import cors from 'cors';
import { logRoute } from './routes/log.routes';

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

export const app: Express = express();
app.use(express.json());
app.use(cors());
app.use('/rocket', rocketRoute);
app.use('/log', logRoute);

export async function connectDb() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ingyz5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('MongoDB connected');

    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
connectDb();
