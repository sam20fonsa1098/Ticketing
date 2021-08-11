import { Router } from 'express';
import { searchUserRouter } from './searchUser.routes';
import { notFoundRouter } from './notFound.routes';
import { signinRouter } from './signin.routes';
import { signoutRouter } from './signout.routes';
import { signupRouter } from './signup.routes';

const router = Router();

router.use('/api/users', searchUserRouter);
router.use('/api/users/signin', signinRouter);
router.use('/api/users/signup', signupRouter);
router.use('/api/users/signout', signoutRouter);
router.use('*', notFoundRouter);

export { router };