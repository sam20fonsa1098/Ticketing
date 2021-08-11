import './TokenProvider';
import { container } from 'tsyringe';

import { ITicketsRepository } from '../repositories/models/ITicketsRepository';
import { TicketsRepository } from '../infra/typeorm/repositories/TicketsRepository';
import { IOrdersRepository } from '../repositories/models/IOrdersRepository';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';

container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository);
container.registerSingleton<ITicketsRepository>('TicketsRepository', TicketsRepository);
