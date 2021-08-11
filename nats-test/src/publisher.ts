import { connect } from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticketCreatedPublisher';

console.clear();

const client = connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
});

client.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const ticketCreatedPublisher = new TicketCreatedPublisher(client);

  await ticketCreatedPublisher.publish({
    id: 'abc123',
    title: 'concert',
    price: 20
  });

});