import { Router } from 'express';
import { notFoundRouter } from './notFound.routes';
import { ticketsRouter } from './ticketings.routes';

const router = Router();
router.use('/api/tickets', ticketsRouter);
router.use('*', notFoundRouter);

export { router };