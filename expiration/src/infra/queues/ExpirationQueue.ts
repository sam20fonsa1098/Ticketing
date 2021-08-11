import Queue from 'bull';
import { natsWrapper } from '../nats/NatsWrapper';
import { ExpirationCompletedPublihser } from '../nats/publishers/ExpirationCompletedPublisher';

interface IPayload {
  order_id: string;
}

const expirationQueue = new Queue<IPayload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  }
});

expirationQueue.process(async (job) => {
  new ExpirationCompletedPublihser(natsWrapper.client).publish({ order_id: job.data.order_id });
});

export { expirationQueue };