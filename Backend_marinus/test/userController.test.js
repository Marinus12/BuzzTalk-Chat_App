import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app'; // Your Express app

chai.use(chaiHttp);
const { expect } = chai;

describe('User API', () => {
  it('should get all users', (done) => {
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new user', (done) => {
    const user = { name: 'John Doe', email: 'john@example.com', password: 'P@ssw0rd', location: 'New York' };
    chai.request(app)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('name', 'John Doe');
        done();
      });
  });

  // More tests for updating, deleting, etc.
});
