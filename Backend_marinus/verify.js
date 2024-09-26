import jwt from 'jsonwebtoken';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmYzZDljNTdjNTBkNWNmYzNhOWE2N2MiLCJpYXQiOjE3MjcyNTk5ODYsImV4cCI6MTcyNzI1OTk4OX0.N8xfd6euXpym9R2BSBS840A9uj8_eu8tjjBsGhF4jpQ';
const secret = process.env.JWT_SECRET; // Make sure this matches the one used to sign the token

jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    console.error("Verification failed:", err.message);
  } else {
    console.log("Decoded token:", decoded);
  }
});
