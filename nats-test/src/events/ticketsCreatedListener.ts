import { Message } from "node-nats-streaming";
import { Listener } from "./baseListener";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from './ticketCreatedEvent';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  public readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  public readonly queueGroupName: TicketCreatedEvent['queueGroupName'] = 'payments-service';

  public onMessage(data: TicketCreatedEvent['data'], message: Message): void {
    console.log('Event data!', data);
    message.ack();
  }
}

export { TicketCreatedListener }

