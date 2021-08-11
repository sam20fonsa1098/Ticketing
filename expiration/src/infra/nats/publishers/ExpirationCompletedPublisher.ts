import { Publisher, ExpirationCompletedEvent, Events } from '@sam20fonsa1098tickets/common';

class ExpirationCompletedPublihser extends Publisher<ExpirationCompletedEvent> {
  public readonly subject: Events.ExpirationCompleted = Events.ExpirationCompleted;
};

export { ExpirationCompletedPublihser }