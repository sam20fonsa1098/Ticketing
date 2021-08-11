import { natsWrapper } from "./NatsWrapper";
import { TicketCreatedListener } from './listeners/TicketCreatedListener';
import { TicketUpdatedListener } from './listeners/TicketUpdatedListener';
import { ExpirationCompletedListener } from "./listeners/ExpirationCompletedListener";
import { PaymentCreatedListener } from "./listeners/PaymentCreatedListener";

export default async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'test') {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!, 
      process.env.NATS_CLIENT_ID!, 
      process.env.NATS_URL!
    );
    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompletedListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();
    natsWrapper.client.on('close', () => {
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  }
}
