import { Router } from 'express';
import { NotFoundError } from '@sam20fonsa1098tickets/common';

const notFoundRouter = Router();

notFoundRouter.all('*', () => {
  throw new NotFoundError();
})

export { notFoundRouter }