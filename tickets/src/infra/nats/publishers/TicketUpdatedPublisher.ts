import { Publisher, TicketUpdatedEvent, Events } from '@sam20fonsa1098tickets/common';

class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  public readonly subject: Events.TicketUpdated = Events.TicketUpdated;
};

export { TicketUpdatedPublisher }