import { Router } from 'express';
import { container } from 'tsyringe';

import { UsersController } from '../controllers/UsersController';
import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';

const searchUserRouter = Router();
const usersController = new UsersController();
const ensureAuthenticated = container.resolve(EnsureAuthenticated);

searchUserRouter.get('/', ensureAuthenticated.execute, usersController.index);

export { searchUserRouter };
