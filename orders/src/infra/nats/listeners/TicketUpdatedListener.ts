import { Events, Listener, NotFoundError, TicketUpdatedEvent } from "@sam20fonsa1098tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./QueueGroupName";
import { UpdateTicketService } from '../../../services/UpdateTicket/UpdateTicketService';
import { FindTicketByIdService } from '../../../services/FindTicketById/FindTicketByIdService';
import { container } from "tsyringe";
import { Tickets } from "../../typeorm/entities/Tickets";
import { ObjectID } from "mongodb";

class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  public readonly subject: Events.TicketUpdated = Events.TicketUpdated;
  public readonly queueGroupName: TicketUpdatedEvent['queueGroupName'] = queueGroupName;
  private updateTicketService: UpdateTicketService = container.resolve(UpdateTicketService);
  private findTicketByIdService: FindTicketByIdService = container.resolve(FindTicketByIdService);

  public async onMessage(data: TicketUpdatedEvent['data'], message: Message): Promise<void> {
    const ticket = await this.findTicketByIdService.execute(data.id);
    if (this.isNextVersion(ticket, data)) {
      await this.updateTicketService.execute(data);
      message.ack();
      return;
    }
    throw new NotFoundError();
  }

  private isNextVersion(ticket: Tickets, data: TicketUpdatedEvent['data']) {
    return ticket && ticket.version + 1 === data.version
  }
}

export { TicketUpdatedListener }

