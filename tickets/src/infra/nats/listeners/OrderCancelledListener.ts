import { Events, Listener, OrderCancelledEvent } from "@sam20fonsa1098tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./QueueGroupName";
import { UpdateTicketService } from '../../../services/UpdateTicket/UpdateTicketService';
import { container } from "tsyringe";
import { TicketUpdatedPublisher } from "../publishers/TicketUpdatedPublisher";

class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  public readonly subject: Events.OrderCancelled = Events.OrderCancelled;
  public readonly queueGroupName: OrderCancelledEvent['queueGroupName'] = queueGroupName;
  private updateTicketService = container.resolve(UpdateTicketService);

  public async onMessage(data: OrderCancelledEvent['data'], message: Message): Promise<void> {
    const ticket = await this.updateTicketService.execute({ id: data.ticket.id })
    new TicketUpdatedPublisher(this.client).publish({...ticket, id: ticket.id.toString()});
    message.ack();
  }
}

export { OrderCancelledListener }

