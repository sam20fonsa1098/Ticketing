import { validationHandler } from '@sam20fonsa1098tickets/common';
import { Router } from 'express';
import { body } from 'express-validator';
import { container } from 'tsyringe';
import { PaymentsController } from '../controllers/PaymentsController';
import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';

const paymentsRouter = Router();
const ensureAuthenticated = container.resolve(EnsureAuthenticated);
const paymentsController = new PaymentsController();

paymentsRouter.post(
  '/', 
  ensureAuthenticated.execute,
  [
    body('token')
      .not()
      .isEmpty()
      .withMessage('token is required'),
    body('order_id')
      .not()
      .isEmpty()
      .withMessage('order_id is required')
  ],
  validationHandler,
  paymentsController.create
)

export { paymentsRouter };