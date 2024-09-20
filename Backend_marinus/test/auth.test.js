import request from 'supertest';
import { expect } from 'chai';
import app from '../server.js';

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});
