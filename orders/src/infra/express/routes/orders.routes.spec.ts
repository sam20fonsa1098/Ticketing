import request from "supertest";
import { Connection } from "typeorm";
import { OrderStatus } from "@sam20fonsa1098tickets/common";
import { app } from "../app";
import createConnection from "../../typeorm";
import { natsWrapper } from '../../nats/NatsWrapper';
import { TicketsRepository } from '../../typeorm/repositories/TicketsRepository';
import { OrdersRepository } from '../../typeorm/repositories/OrdersRepository';
import { JWTTokenProvider } from '../../../providers/TokenProvider/implementations/JWTTokenProvider';
import { ObjectID } from "mongodb";

let connection: Connection;
let jwtProvider: JWTTokenProvider;
let ticketsRepository: TicketsRepository;
let ordersRepository: OrdersRepository;
let user_data: {email: string, id: string};
let another_user_data: {email: string, id: string};
let token: string;
let another_token: string;
let id: string;
let ticket_id: string;

jest.mock('../../nats/NatsWrapper');

describe('TicketingsRouter', () => {
  beforeAll(async () => {
    connection = await createConnection();
    jwtProvider = new JWTTokenProvider()
    user_data = { email: "samfonsa12345@gmail.com", id: "abc123" }
    another_user_data = { email: "samfonsa12345@gmail.com", id: "abc12" }
    token = "jwt=" + await jwtProvider.generateAccessToken(user_data);
    another_token = "jwt=" + await jwtProvider.generateAccessToken(another_user_data);
    ticketsRepository = new TicketsRepository();
    ordersRepository = new OrdersRepository();
    ticket_id = "61117ffed51e040024ff6d01";
  });

  beforeEach(() => {
    jest.clearAllMocks();
  })
  
  it('should be able to return a not found search for a non existing ticket', async () => {
    const response = await request(app).post('/api/orders').send({ ticket_id }).set('Cookie', token);
    expect(response.statusCode).toEqual(404);
  });

  it('should be able to return a bad request error for a reserved order', async () => {
    const ticket = await ticketsRepository.createTicket({price: 20, title: 'Teste', version: 1, id: ticket_id});
    await ordersRepository.createOrder({
      expires_at: new Date(), 
      status: OrderStatus['Created'], 
      ticket_id: ticket.id.toString(), 
      user_id: user_data.id,
    })
    const response = await request(app).post('/api/orders').send({
      ticket_id: ticket.id,
    }).set('Cookie', token);
    expect(response.statusCode).toEqual(400);
  });

  it('should be able to create a order', async () => {
    const ticket = await ticketsRepository.createTicket({price: 20, title: 'Teste', version: 1, id: ticket_id});
    const response = await request(app).post('/api/orders').send({
      ticket_id: ticket.id,
    }).set('Cookie', token);
    id = response.body.id;
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });

  it('should be able list a order by user', async () => {
    const response = await request(app).get('/api/orders').set('Cookie', token);
    expect(response.statusCode).toEqual(200);
    response.body.forEach((order: {user_id: string}) => {
      expect(order.user_id).toBe(user_data.id)
    })
  });

  it('should be able to show a order by id', async () => {
    const response = await request(app).get(`/api/orders/${id}`).set('Cookie', token);
    expect(response.statusCode).toEqual(200);
    expect(response.body.id).toBe(id);
    expect(response.body.user_id).toBe(user_data.id);
  });

  it('should not be able to show a order by id with a wrong user', async () => {
    const response = await request(app).get(`/api/orders/${id}`).set('Cookie', another_token);
    expect(response.statusCode).toEqual(401);
  });

  it('should not be able to cancel a order with a wrong user', async () => { 
    const response = await request(app).delete(`/api/orders/${id}`).set('Cookie', another_token);
    expect(response.statusCode).toEqual(401);
  });

  it('should be able to cancel a order with a correct user', async () => {
    const response = await request(app).delete(`/api/orders/${id}`).set('Cookie', token);
    expect(response.statusCode).toEqual(200);
    expect(response.body.status).toBe(OrderStatus['Cancelled']);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
})