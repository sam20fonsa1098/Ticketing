import { Events, Listener, PaymentCreatedEvent } from "@sam20fonsa1098tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./QueueGroupName";
import { CompleteOrderService } from '../../../services/CompleteOrder/CompleteOrderService';
import { container } from "tsyringe";

class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  public readonly subject: Events.PaymentCreated = Events.PaymentCreated;
  public readonly queueGroupName: PaymentCreatedEvent['queueGroupName'] = queueGroupName;
  private completeOrderService = container.resolve(CompleteOrderService);

  public async onMessage(data: PaymentCreatedEvent['data'], message: Message): Promise<void> {
    await this.completeOrderService.execute({id: data.id});
    message.ack();
  }
}

export { PaymentCreatedListener }

