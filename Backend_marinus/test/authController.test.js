import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app'; // Your Express app

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth API', () => {
  it('should register a new user', (done) => {
    const user = { name: 'Jane Doe', email: 'jane@example.com', password: 'P@ssw0rd' };
    chai.request(app)
      .post('/api/auth/register')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should login a user', (done) => {
    const user = { email: 'jane@example.com', password: 'P@ssw0rd' };
    chai.request(app)
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
