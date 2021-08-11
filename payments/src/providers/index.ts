import './TokenProvider';
import './PaymentsProvider';

import { IOrdersRepostiroy } from '../repositories/models/IOrdersRepository';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import { IPaymentsRepository } from '../repositories/models/IPaymentsRepository';
import { PaymentsRepository } from '../infra/typeorm/repositories/PaymentsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IOrdersRepostiroy>('OrdersRepository', OrdersRepository);
container.registerSingleton<IPaymentsRepository>('PaymentsRepository', PaymentsRepository);
