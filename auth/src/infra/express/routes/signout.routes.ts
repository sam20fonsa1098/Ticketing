import { Router } from 'express';
import { container } from 'tsyringe';

import { SessionsController } from '../controllers/SessionsController';
import { EnsureAuthenticated } from '../middlewares/ensureAuthenticated';

const signoutRouter = Router();
const sessionsController = new SessionsController();
const ensureAuthenticated = container.resolve(EnsureAuthenticated);

signoutRouter.post('/', ensureAuthenticated.execute, sessionsController.delete);

export { signoutRouter };
