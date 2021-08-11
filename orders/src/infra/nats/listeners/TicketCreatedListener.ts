import { Events, Listener, TicketCreatedEvent } from "@sam20fonsa1098tickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./QueueGroupName";
import { CreateTicketService } from '../../../services/CreateTicket/CreateTicketService';
import { container } from "tsyringe";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  public readonly subject: Events.TicketCreated = Events.TicketCreated;
  public readonly queueGroupName: TicketCreatedEvent['queueGroupName'] = queueGroupName;
  private createTicketService: CreateTicketService = container.resolve(CreateTicketService);

  public async onMessage(data: TicketCreatedEvent['data'], message: Message): Promise<void> {
    await this.createTicketService.execute(data);
    message.ack();
  }
}

export { TicketCreatedListener }

