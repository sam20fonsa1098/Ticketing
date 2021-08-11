import { Router } from 'express';
import { ordersRouter } from './orders.routes';

const router = Router();
router.use('/api/orders', ordersRouter);

export { router };