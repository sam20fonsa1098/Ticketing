import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../typeorm';
import { app } from '../app';

let connection: Connection;
let data: { email: string; password: string };

describe('SignInRouter', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    data = {
      email: 'samfonsa12345@gmail.com',
      password: 'abc123',
    };
  });

  it('should be able to search a authenticated user', async () => {
    await request(app).post('/api/users/signup').send(data);
    const signinResponse = await request(app)
      .post('/api/users/signin')
      .send(data);
    const token = signinResponse.get('Set-Cookie');
    const searchResponse = await request(app)
      .get(`/api/users?email=${data.email}`)
      .set('Cookie', token);
    expect(searchResponse.statusCode).toEqual(200);
    expect(searchResponse.body).toHaveProperty('id');
  });

  afterAll(async () => {
    if (connection) {
      await connection.dropDatabase();
      await connection.close();
    }
  });
});
