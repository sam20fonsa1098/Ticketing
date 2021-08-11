import { TicketCreatedListener } from './events/ticketsCreatedListener';
import { connect } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const client = connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
});

client.on('connect', () => {
  console.log('Listener connected');

  client.on('close', () => {
    console.log('Nats connection closed!');
    process.exit();
  });

  const ticketCreatedListener = new TicketCreatedListener(client);
  ticketCreatedListener.listen();

});

process.on('SIGINT', () => client.close());
process.on('SIGTERM', () => client.close());

