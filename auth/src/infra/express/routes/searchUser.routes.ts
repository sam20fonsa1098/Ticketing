import { Router } from 'express';
import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';
import { UsersController } from '../controllers/UsersController';
import { container } from 'tsyringe';

const searchUserRouter = Router();
const usersController = new UsersController();
const ensureAuthenticated = container.resolve(EnsureAuthenticated);

searchUserRouter.get(
  '/', 
  ensureAuthenticated.execute,
  usersController.index
);

export { searchUserRouter };