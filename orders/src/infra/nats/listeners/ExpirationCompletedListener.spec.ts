import "reflect-metadata";
import '../../../providers';
import { ExpirationCompletedListener } from './ExpirationCompletedListener';
import { natsWrapper } from '../NatsWrapper';
import { ExpirationCompletedEvent, OrderStatus } from '@sam20fonsa1098tickets/common';
import { ObjectID } from 'mongodb';
import { Message } from 'node-nats-streaming';
import { Connection } from 'typeorm';
import { OrdersRepository } from '../../typeorm/repositories/OrdersRepository';
import createConnection from "../../typeorm";

let connection: Connection;
let expirationCompletedListener: ExpirationCompletedListener;
let ordersRepository: OrdersRepository;

let order_id: string;
let data: ExpirationCompletedEvent['data'];
let message: Message

jest.mock('../NatsWrapper');

describe('TicketListener', () => {
  beforeAll(async () => {
    connection = await createConnection();
    expirationCompletedListener = new ExpirationCompletedListener(natsWrapper.client);
    ordersRepository = new OrdersRepository();
  });

  beforeEach(async () => {
    const order = await ordersRepository.createOrder({
      expires_at: new Date(), 
      status: OrderStatus['Created'], 
      ticket_id: '1234561236456',
      user_id: '12345612345',
    })
    order_id = order.id.toString();
    data = { order_id }
    // @ts-ignore
    message = Message = {
      ack: jest.fn()
    }
  })

  it('should be able to call the ack function in message', async () => {
    await expirationCompletedListener.onMessage(data, message);
    const order = await ordersRepository.findOrderById(order_id);
    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])
    expect(eventData.id).toEqual(order_id);
    expect(message.ack).toHaveBeenCalled();
    expect(order?.status).toEqual(OrderStatus['Cancelled']);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
})