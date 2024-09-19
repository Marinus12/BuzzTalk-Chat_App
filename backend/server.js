import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import MessageRoutes from './routes/message.routes.js';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectToMongoDB } from './db/connectToMongoDB.js';
import Message from './models/message.model.js';

connectToMongoDB();

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
const server = createServer(app);
const io = new Server(server);

//app.get("/", (req, res) => {
  //  res.send("am connected!");
//});

app.use("/api/auth", authRoutes);
app.use("api/message", MessageRoutes);
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
