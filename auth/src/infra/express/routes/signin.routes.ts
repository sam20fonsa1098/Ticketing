import { Router } from 'express';
import { body } from 'express-validator';

import { validationHandler } from '@sam20fonsa1098tickets/common';

import { SessionsController } from '../controllers/SessionsController';

const signinRouter = Router();
const sessionsController = new SessionsController();

signinRouter.post(
  '/',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validationHandler,
  sessionsController.create,
);

export { signinRouter };
