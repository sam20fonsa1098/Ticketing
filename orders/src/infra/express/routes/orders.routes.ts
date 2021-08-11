import { Router } from 'express';
import { param, body } from 'express-validator';
import { validationHandler } from '@sam20fonsa1098tickets/common';
import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';
import { OrdersController } from '../controllers/OrdersController';
import { container } from 'tsyringe';

const ordersRouter = Router();
const ordersController = new OrdersController();
const ensureAuthenticated = container.resolve(EnsureAuthenticated);

ordersRouter.get('/', ensureAuthenticated.execute, ordersController.index);

ordersRouter.get(
  '/:id',
  ensureAuthenticated.execute,
  [
    param('id')
      .not()
      .isEmpty()
      .withMessage('Id is required'),
  ],
  validationHandler,
  ordersController.get
);

ordersRouter.post(
  '/', 
  ensureAuthenticated.execute,
  [
    body('ticket_id')
      .not()
      .isEmpty()
      .withMessage('Ticket Id is required'),
  ],
  validationHandler,
  ordersController.create
);

ordersRouter.delete(
  '/:id',
  ensureAuthenticated.execute,
  [
    param('id')
      .not()
      .isEmpty()
      .withMessage('Id is required'),
  ],
  validationHandler,
  ordersController.delete
)

export { ordersRouter };