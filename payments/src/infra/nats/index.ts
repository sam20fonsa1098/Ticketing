import { natsWrapper } from "./NatsWrapper";
import { OrderCreatedListener } from './listeners/OrderCreatedListener';
import { OrderCancelledListener } from './listeners/OrderCancelledListener';

export default async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'test') {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!, 
      process.env.NATS_CLIENT_ID!, 
      process.env.NATS_URL!
    );
    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();
    natsWrapper.client.on('close', () => {
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  }
}
