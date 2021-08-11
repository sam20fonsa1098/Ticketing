import { Publisher, Events, OrderCreatedEvent } from "@sam20fonsa1098tickets/common";

class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  public readonly subject: Events.OrderCreated = Events.OrderCreated;
}

export { OrderCreatedPublisher }
