import './TokenProvider';

import { ITicketsRepository } from '../repositories/models/ITicketsRepository';
import { TicketsRepository } from '../infra/typeorm/repositories/TicketsRepository';
import { container } from 'tsyringe';

container.registerSingleton<ITicketsRepository>('TicketsRepository', TicketsRepository);
