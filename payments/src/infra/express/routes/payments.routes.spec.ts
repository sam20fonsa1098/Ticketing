import request from 'supertest';
import { Connection } from 'typeorm';
import { OrdersRepository } from '../../typeorm/repositories/OrdersRepository';
import { JWTTokenProvider } from '../../../providers/TokenProvider/implementations/JWTTokenProvider';
import createConnection from '../../typeorm';
import { app } from '../app';
import { OrderStatus } from '@sam20fonsa1098tickets/common';

let connection: Connection;
let ordersRepository: OrdersRepository;
let jwtProvider: JWTTokenProvider;

let user: {email: string, id: string}
let another_user: {email: string, id: string}
let token: string;
let another_token: string;

describe('PaymentsRouter', () => {
  beforeAll(async () => {
    connection = await createConnection();
    ordersRepository = new OrdersRepository();
    user = { email: "samfonsa12345@gmail.com", id: "abc123" };
    jwtProvider = new JWTTokenProvider();
    token = "jwt=" + await jwtProvider.generateAccessToken(user);
    another_user = { email: "samfonsa12345@gmail.com", id: "abc12" }
    another_token = "jwt=" + await jwtProvider.generateAccessToken(another_user);
  });

  it('should not be able to create a charge with missing token', async () => {
    const response = await request(app).post('/api/payments');
    expect(response.statusCode).toEqual(401);
  })

  it('should not be able to create a charge with missing params', async () => {
    const response = await request(app).post('/api/payments').set('Cookie', token);
    expect(response.statusCode).toEqual(400);
  })

  it('should not be able to create a charge with a non existing order', async () => {
    const response = await request(app).post('/api/payments').set('Cookie', token).send({
      order_id: "123456123456",
      token: "123456"
    });
    expect(response.statusCode).toEqual(404);
  });

  it('should not be able to create a charge with the wrong user', async () => {
    await ordersRepository.createOrder({
      id: '123456',
      price: 10,
      status: OrderStatus['Created'],
      user_id: user.id,
      version: 1
    })
    const response = await request(app).post('/api/payments').set('Cookie', another_token).send({
      order_id: "123456123456",
      token: "123456"
    });
    expect(response.statusCode).toEqual(401);
  });
  
  it('should not be able to create a charge with the wrong user', async () => {
    await ordersRepository.createOrder({
      id: '123456123456',
      price: 10,
      status: OrderStatus['Created'],
      user_id: user.id,
      version: 1
    })
    const response = await request(app).post('/api/payments').set('Cookie', another_token).send({
      order_id: "123456123456",
      token: "123456"
    });
    expect(response.statusCode).toEqual(401);
  });

  it('should not be able to create a charge with a cancelled order', async () => {
    await ordersRepository.createOrder({
      id: '123456123456',
      price: 10,
      status: OrderStatus['Cancelled'],
      user_id: user.id,
      version: 1
    })
    const response = await request(app).post('/api/payments').set('Cookie', token).send({
      order_id: "123456123456",
      token: "123456"
    });
    expect(response.statusCode).toEqual(400);
  });

  it('should be able to create a charge', async () => {
    await ordersRepository.createOrder({
      id: '123456123456',
      price: 10,
      status: OrderStatus['Created'],
      user_id: user.id,
      version: 1
    })
    const response = await request(app).post('/api/payments').set('Cookie', token).send({
      order_id: "123456123456",
      token: "123456"
    });
    expect(response.statusCode).toEqual(201);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })
})