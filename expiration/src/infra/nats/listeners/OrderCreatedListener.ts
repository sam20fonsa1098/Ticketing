import { Events, Listener, OrderCreatedEvent } from "@sam20fonsa1098tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./QueueGroupName";
import { expirationQueue } from '../../queues/ExpirationQueue';

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  public readonly subject: Events.OrderCreated = Events.OrderCreated;
  public readonly queueGroupName: OrderCreatedEvent['queueGroupName'] = queueGroupName;

  public async onMessage(data: OrderCreatedEvent['data'], message: Message): Promise<void> {
    const delay = new Date(data.expires_at).getTime() - new Date().getTime();
    await expirationQueue.add({
      order_id: data.id,
    }, {
      delay,
    });
    message.ack();
  }
}

export { OrderCreatedListener }

