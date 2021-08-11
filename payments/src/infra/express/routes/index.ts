import { Router } from 'express';
import { notFoundRouter } from './notFound.routes';
import { paymentsRouter } from './payments.routes';

const router = Router();
router.use('/api/payments', paymentsRouter);
router.use('*', notFoundRouter);

export { router };