import { Publisher, Events, OrderCancelledEvent } from "@sam20fonsa1098tickets/common";

class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  public readonly subject: Events.OrderCancelled = Events.OrderCancelled;
}

export { OrderCancelledPublisher }
