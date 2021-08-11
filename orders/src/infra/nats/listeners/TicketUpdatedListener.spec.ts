import "reflect-metadata";
import '../../../providers';
import { TicketUpdatedListener } from './TicketUpdatedListener';
import { TicketCreatedListener } from './TicketCreatedListener';
import { natsWrapper } from '../NatsWrapper';
import { NotFoundError, TicketCreatedEvent } from '@sam20fonsa1098tickets/common';
import { ObjectID } from 'mongodb';
import { Message } from 'node-nats-streaming';
import { Connection } from 'typeorm';
import createConnection from "../../typeorm";

let connection: Connection;
let ticketUpdatedListener: TicketUpdatedListener;
let ticketCreatedListener: TicketCreatedListener;

let user_id: string;
let id: string;
let version: number;
let price: number;
let title: string;

let data: TicketCreatedEvent['data'];
let message: Message

jest.mock('../NatsWrapper');

describe('TicketListener', () => {
  beforeAll(async () => {
    connection = await createConnection();
    ticketCreatedListener = new TicketCreatedListener(natsWrapper.client);
    ticketUpdatedListener = new TicketUpdatedListener(natsWrapper.client);
  });

  beforeEach(() => {
    user_id = new ObjectID().toHexString();
    id = new ObjectID().toHexString();
    version = 0
    price = 10
    title = 'Example'
    data = { version, price, id, user_id, title }
    // @ts-ignore
    message = Message = {
      ack: jest.fn()
    }
  })

  it('should not be able to call the ack function in message', async () => {
    expect(async() => {
      await ticketUpdatedListener.onMessage(data, message);
    }).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should not be able to update a ticket and call the ack message', async () => {
    await ticketCreatedListener.onMessage(data, message);
    data.version = 4;
    expect(async () => {
      await ticketUpdatedListener.onMessage(data, message);
    }).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should be able to update a ticket and call the ack message', async () => {
    data.id = new ObjectID().toHexString();
    await ticketCreatedListener.onMessage(data, message);
    data.version = 1;
    await ticketUpdatedListener.onMessage(data, message);
    expect(message.ack).toHaveBeenCalled();
  });
  
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
})