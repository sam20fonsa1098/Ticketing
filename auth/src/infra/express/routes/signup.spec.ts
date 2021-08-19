import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../typeorm';
import { app } from '../app';

let connection: Connection;

describe('SignUpRouter', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  it('should be able to create a new user with a return of 201 code status', async () => {
    const response = await request(app).post('/api/users/signup').send({
      email: 'samfonsa12345@gmail.com',
      password: 'abc123',
    });
    expect(response.statusCode).toEqual(201);
  });

  it('should be able to return status code:400 with an invalid email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'samfonsa12345gmail.com',
        password: 'abc123',
      })
      .expect(400);
  });

  it('should be able to return status code:400 with an invalid password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'samfonsa12345@gmail.com',
        password: '1',
      })
      .expect(400);
  });

  it('should be able to return status code:400 with missing email and password', async () => {
    await request(app).post('/api/users/signup').send({}).expect(400);
  });

  it('should not be able to register a user with that already exists the email', async () => {
    await request(app).post('/api/users/signup').send({
      email: 'samfonsa12345@gmail.com',
      password: 'abc123',
    });
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'samfonsa12345@gmail.com',
        password: 'abc123',
      })
      .expect(400);
  });

  afterAll(async () => {
    if (connection) {
      await connection.dropDatabase();
      await connection.close();
    }
  });
});
