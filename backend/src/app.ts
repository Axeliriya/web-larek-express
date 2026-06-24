import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import routes from './routes';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';

dotenv.config();

const {
  PORT = 3000,
  ORIGIN_ALLOW = 'http://localhost:3000',
  DB_ADDRESS = 'mongodb://localhost:27017/products',
} = process.env;

const app = express();
mongoose.connect(DB_ADDRESS);

app.use(cors({ origin: ORIGIN_ALLOW, credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
