import 'dotenv/config';
import "reflect-metadata"; 
import 'express-async-errors';
import { errorHandler } from '@sam20fonsa1098tickets/common';
import createConnection from '../typeorm';
import '../../providers';
import express from 'express';
import { router } from './routes';
import natsConnection from '../nats';

createConnection();
natsConnection();

const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandler);

export { app };
