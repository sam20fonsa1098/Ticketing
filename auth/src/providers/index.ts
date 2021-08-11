import './HashProvider';
import './TokenProvider';

import { container } from 'tsyringe';

import { IUsersRepository } from '../repositories/models/IUsersRepository';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);