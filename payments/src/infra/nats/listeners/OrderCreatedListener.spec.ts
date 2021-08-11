import "reflect-metadata";
import '../../../providers';
import { OrderCreatedListener } from './OrderCreatedListener';
import { natsWrapper } from '../NatsWrapper';
import { ExpirationCompletedEvent, OrderStatus } from '@sam20fonsa1098tickets/common';
import { Message } from 'node-nats-streaming';
import { Connection } from 'typeorm';
import { OrdersRepository } from '../../typeorm/repositories/OrdersRepository';
import createConnection from "../../typeorm";

let connection: Connection;
let orderCreatedListener: OrderCreatedListener;
let ordersRepository: OrdersRepository;

let order_id: string;
let data: ExpirationCompletedEvent['data'];
let message: Message

jest.mock('../NatsWrapper');

describe('TicketListener', () => {
  beforeAll(async () => {
    connection = await createConnection();
    orderCreatedListener = new OrderCreatedListener(natsWrapper.client);
    ordersRepository = new OrdersRepository();
  });

  it('should be able to call the ack function in message', async () => {
    await orderCreatedListener.onMessage({
      id: '123456123456',
      status: OrderStatus['Created'],
      user_id: "123456123456",
      version: 1,
      ticket: {
        id: "123456",
        price: 10
      },
      expires_at: '1203456'
    }, message);
    const order = await ordersRepository.findOrderById(order_id);
    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])
    expect(eventData.id).toEqual(order!.id.toString());
    expect(message.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
})