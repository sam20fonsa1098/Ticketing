import { Events, Listener, ExpirationCompletedEvent } from "@sam20fonsa1098tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./QueueGroupName";
import { CancelOrderByExpirationService } from '../../../services/CancelOrderByExpiration/CancelOrderByExpirationService';
import { container } from "tsyringe";
import { OrderCancelledPublisher } from "../publishers/OrderCancelledPublisher";

class ExpirationCompletedListener extends Listener<ExpirationCompletedEvent> {
  public readonly subject: Events.ExpirationCompleted = Events.ExpirationCompleted;
  public readonly queueGroupName: ExpirationCompletedEvent['queueGroupName'] = queueGroupName;
  private cancelOrderByExpirationService: CancelOrderByExpirationService = container.resolve(CancelOrderByExpirationService);

  public async onMessage(data: ExpirationCompletedEvent['data'], message: Message): Promise<void> {
    const order = await this.cancelOrderByExpirationService.execute(data.order_id);
    new OrderCancelledPublisher(this.client).publish({
      ...order, 
      ticket: { id: order.ticket_id }, 
      id: order.id.toString()
    })
    message.ack();
  }
}

export { ExpirationCompletedListener }

