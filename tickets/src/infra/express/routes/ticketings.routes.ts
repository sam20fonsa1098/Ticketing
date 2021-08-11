import { validationHandler } from '@sam20fonsa1098tickets/common';
import { Router } from 'express';
import { body, param } from 'express-validator';
import { container } from 'tsyringe';
import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';
import { TicketsController } from '../controllers/TicketsController';

const ticketsRouter = Router();
const ticketsController = new TicketsController();
const ticketController = new TicketsController();
const ensureAuthenticated = container.resolve(EnsureAuthenticated);

ticketsRouter.post(
  '/', 
  [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be valid')
  ],
  validationHandler,
  ensureAuthenticated.execute,
  ticketController.create,
)

ticketsRouter.put(
  '/:id', 
  [
    param('id')
      .not()
      .isEmpty()
      .withMessage('Id is required'),
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be valid')
  ],
  validationHandler,
  ensureAuthenticated.execute,
  ticketController.update,
)

ticketsRouter.get(
  '/:id', 
  [
    param('id')
      .not()
      .isEmpty()
      .withMessage('Id is required'),
  ],
  validationHandler,
  ticketController.get,
)

ticketsRouter.get(
  '/', 
  ticketsController.index,
)

export { ticketsRouter };