import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app'; // Assuming your app entry point is in `app.js`

chai.use(chaiHttp);
const { expect } = chai;

describe('Message API', () => {
  it('should get all messages', (done) => {
    chai.request(app)
      .get('/api/messages')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new message', (done) => {
    const message = { content: 'Hello', sender: 'John', receiver: 'Doe' };
    chai.request(app)
      .post('/api/messages')
      .send(message)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // Add more tests for update, delete, etc.
});
