import { Publisher, TicketCreatedEvent, Events } from '@sam20fonsa1098tickets/common';

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  public readonly subject: Events.TicketCreated = Events.TicketCreated;
};

export { TicketCreatedPublisher }