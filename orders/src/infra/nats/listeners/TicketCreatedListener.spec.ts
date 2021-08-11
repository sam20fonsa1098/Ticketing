import "reflect-metadata";
import '../../../providers';
import { TicketCreatedListener } from './TicketCreatedListener';
import { natsWrapper } from '../NatsWrapper';
import { TicketCreatedEvent } from '@sam20fonsa1098tickets/common';
import { ObjectID } from 'mongodb';
import { Message } from 'node-nats-streaming';
import { Connection } from 'typeorm';
import createConnection from "../../typeorm";

let connection: Connection;
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

  it('should be able to call the ack function in message', async () => {
    await ticketCreatedListener.onMessage(data, message);
    expect(message.ack).toHaveBeenCalled();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
})