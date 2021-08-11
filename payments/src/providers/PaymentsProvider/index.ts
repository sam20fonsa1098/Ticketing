import { IPaymentsProvider } from './models/IPaymentsProvider';
import { StripePaymentsProvider } from './implementations/StripePaymentsProvider';
import { container } from 'tsyringe';

container.registerSingleton<IPaymentsProvider>('PaymentsProvider', StripePaymentsProvider);