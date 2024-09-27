import chai from 'chai';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/auth';

const { expect } = chai;

describe('Auth Middleware', () => {
  it('should verify a valid token', (done) => {
    const token = jwt.sign({ userId: '123' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const req = { headers: { authorization: token } };
    const res = {};
    const next = () => {
      expect(req).to.have.property('user');
      done();
    };
    verifyToken(req, res, next);
  });

  it('should reject an invalid token', (done) => {
    const req = { headers: { authorization: 'invalid-token' } };
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(401);
        return res;
      },
      send: (message) => {
        expect(message).to.equal('Invalid Token');
        done();
      }
    };
    verifyToken(req, res, () => {});
  });
});
