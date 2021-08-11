import { Events, Listener, OrderCreatedEvent } from "@sam20fonsa1098tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./QueueGroupName";
import { CreateOrderService } from '../../../services/CreateOrder/CreateOrderService';
import { container } from "tsyringe";

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  public readonly subject: Events.OrderCreated = Events.OrderCreated;
  public readonly queueGroupName: OrderCreatedEvent['queueGroupName'] = queueGroupName;
  private createOrderService = container.resolve(CreateOrderService);

  public async onMessage(data: OrderCreatedEvent['data'], message: Message): Promise<void> {
    const order = await this.createOrderService.execute({
      id: data.id, 
      status: data.status, 
      user_id: data.user_id, 
      version: data.version,
      price:data.ticket.price
    });
    message.ack();
  }
}

export { OrderCreatedListener }

