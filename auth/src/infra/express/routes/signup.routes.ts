import { Router } from 'express';
import { body } from 'express-validator';

import { validationHandler } from '@sam20fonsa1098tickets/common';

import { UsersController } from '../controllers/UsersController';

const signupRouter = Router();
const usersController = new UsersController();

signupRouter.post(
  '/',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validationHandler,
  usersController.create,
);

export { signupRouter };
