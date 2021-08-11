import { Events, Listener, NotFoundError, OrderCancelledEvent } from "@sam20fonsa1098tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./QueueGroupName";
import { CancelOrderService } from '../../../services/CancelOrder/CancelOrderService';
import { FindOrderByIdService } from '../../../services/FindOrderById/FindOrderByIdService';
import { container } from "tsyringe";
import { Orders } from "../../typeorm/entities/Orders";

class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  public readonly subject: Events.OrderCancelled = Events.OrderCancelled;
  public readonly queueGroupName: OrderCancelledEvent['queueGroupName'] = queueGroupName;
  private cancelOrderService = container.resolve(CancelOrderService);
  private findOrderByIdService = container.resolve(FindOrderByIdService);

  public async onMessage(data: OrderCancelledEvent['data'], message: Message): Promise<void> {
    const order = await this.findOrderByIdService.execute(data.id);
    if (this.isNextVersion(order, data)) {
      const order = await this.cancelOrderService.execute(data.id);
      message.ack();
      return;
    }
    throw new NotFoundError();
  }

  private isNextVersion(order: Orders, data: OrderCancelledEvent['data']) {
    return order && order.version + 1 == data.version;
  }
}

export { OrderCancelledListener }

