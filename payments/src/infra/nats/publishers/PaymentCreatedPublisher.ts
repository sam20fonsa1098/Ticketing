import { Publisher, PaymentCreatedEvent, Events } from '@sam20fonsa1098tickets/common';

class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  public readonly subject: Events.PaymentCreated = Events.PaymentCreated;
};

export { PaymentCreatedPublisher }