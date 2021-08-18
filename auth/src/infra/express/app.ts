import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';

import createConnection from '@infra/typeorm';
import { errorHandler } from '@sam20fonsa1098tickets/common';

import { router } from './routes';

import '@providers';

createConnection();

const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandler);

export { app };
