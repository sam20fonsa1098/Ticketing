import request from "supertest";
import { Connection } from "typeorm";
import { natsWrapper } from '../../nats/NatsWrapper';
import createConnection from "../../typeorm";
import { JWTTokenProvider } from '../../../providers/TokenProvider/implementations/JWTTokenProvider';
import { app } from "../app";

let connection: Connection;
let jwtProvider: JWTTokenProvider;
let token: string;
let secondary_token: string;
let id: string;

jest.mock('../../nats/NatsWrapper');

describe('TicketingsRouter', () => {
  beforeAll(async () => {
    connection = await createConnection();
    jwtProvider = new JWTTokenProvider()
    token = "jwt=" + await jwtProvider.generateAccessToken({
      email: "samfonsa12345@gmail.com",
      id: "abc123"
    });
    secondary_token = "jwt=" + await jwtProvider.generateAccessToken({
      email: "samfonsa1234@gmail.com",
      id: "abc12"
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  })
  
  it('should not be able to create a ticket with a non authorized user', async () => {
    const response = await request(app).post('/api/tickets').send({
      title: "Valid title",
      price: 10,
    });
    expect(response.statusCode).toEqual(401);
  });

  it('should not be able to create a ticket with a invalid title', async () => {
    const response = await request(app).post('/api/tickets').send({
      title: '',
      price: 10,
    }).set('Cookie', token);
    expect(response.statusCode).toEqual(400);
  });

  it('should not be able to create a ticket with a invalid price', async () => {
    const response = await request(app).post('/api/tickets').send({
      title: 'Valid Title',
      price: 'abc',
    }).set('Cookie', token);
    expect(response.statusCode).toEqual(400);
  });

  it('should be able to create a ticket', async () => {
    const response = await request(app).post('/api/tickets').send({
      title: "Valid title",
      price: 10,
    }).set('Cookie', token);
    expect(response.statusCode).toEqual(201);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });


  it('should be able to return a list of tickets', async () => {
    const response = await request(app).get('/api/tickets').set('Cookie', token);
    id = response.body[0]['id'];
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('id');
  });

  it('should be able to update a ticket', async () => {
    const response = await request(app).put(`/api/tickets/${id}`).send({
      title: "Valid title updated",
      price: 10,
    }).set('Cookie', token);
    expect(response.statusCode).toEqual(201);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
  });

  it('should not be able to update a ticket', async () => {
    const response = await request(app).put(`/api/tickets/${id}`).send({
      title: "Invalid title updated",
      price: 10,
    }).set('Cookie', secondary_token);
    expect(response.statusCode).toEqual(400);
  });

  it('should be able to search for a ticket by id', async () => {
    const ticketResponse = await request(app).get(`/api/tickets/${id}`).set('Cookie', token);
    expect(ticketResponse.statusCode).toEqual(200);
    expect(ticketResponse.body.id).toEqual(id);
  });
  
  it('should be able to return a not found search for a not existing ticket', async () => {
    const response = await request(app).get('/api/tickets/123456789124').set('Cookie', token);
    expect(response.statusCode).toEqual(404);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
})