import { Events, Listener, OrderCancelledEvent } from "@sam20fonsa1098tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./QueueGroupName";

class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  public readonly subject: Events.OrderCancelled = Events.OrderCancelled;
  public readonly queueGroupName: OrderCancelledEvent['queueGroupName'] = queueGroupName;

  public async onMessage(data: OrderCancelledEvent['data'], message: Message): Promise<void> {
    message.ack();
  }
}

export { OrderCancelledListener }

