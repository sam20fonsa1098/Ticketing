import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../typeorm';
import { app } from '../app';

let connection: Connection;
let data: { email: string; password: string };

describe('SignInRouter', () => {
  beforeAll(async () => {
    connection = await createConnection();
    data = {
      email: 'samfonsa12345@gmail.com',
      password: 'abc123',
    };
  });

  it('should not be able to signin an invalid user', async () => {
    const response = await request(app).post('/api/users/signin').send(data);
    expect(response.statusCode).toEqual(401);
  });

  it('should not be able to signin a valid user but with wrong password', async () => {
    const response = await request(app)
      .post('/api/users/signin')
      .send({ ...data, password: 'wrongPassword' });
    expect(response.statusCode).toEqual(401);
  });

  it('should be able to signin a valid user', async () => {
    await request(app).post('/api/users/signup').send(data);
    const response = await request(app).post('/api/users/signin').send(data);
    expect(response.statusCode).toEqual(200);
    expect(response.get('Set-Cookie')).toBeDefined();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
