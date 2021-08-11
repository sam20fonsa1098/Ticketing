import { Publisher } from './basePublisher';
import { TicketCreatedEvent } from './ticketCreatedEvent';
import { Subjects } from './subjects';

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  public readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
};

export { TicketCreatedPublisher }