import { Events, Listener, OrderCreatedEvent } from "@sam20fonsa1098tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./QueueGroupName";
import { UpdateTicketService } from '../../../services/UpdateTicket/UpdateTicketService';
import { container } from "tsyringe";
import { TicketUpdatedPublisher } from "../publishers/TicketUpdatedPublisher";

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  public readonly subject: Events.OrderCreated = Events.OrderCreated;
  public readonly queueGroupName: OrderCreatedEvent['queueGroupName'] = queueGroupName;
  private updateTicketService = container.resolve(UpdateTicketService);

  public async onMessage(data: OrderCreatedEvent['data'], message: Message): Promise<void> {
    const ticket = await this.updateTicketService.execute({ id:data.ticket.id, order_id: data.id });
    new TicketUpdatedPublisher(this.client).publish({...ticket, id: ticket.id.toString()});
    message.ack();
  }
}

export { OrderCreatedListener }

