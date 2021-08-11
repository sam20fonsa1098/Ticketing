import request from "supertest";
import { app } from "../app";

jest.mock('../../nats/NatsWrapper');

describe('SignInRouter', () => {
  it('should be able to return a status code equals 404 for a not found route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toEqual(404);
  });
})