# BuzzTalk

**BuzzTalk** is a real-time chat application that allows users to communicate via private and group chat rooms. Users can sign up, log in, join rooms, and send messages that are instantly delivered to other participants. The application uses **Node.js**, **Express**, **MongoDB**, **Mongoose**, and **Socket.io** for real-time communication.

## Features

- **User Authentication**: Users can register, log in, and authenticate using JSON Web Tokens (JWT).
- **Private Messaging**: Users can send private messages to one another within private rooms.
- **Group Messaging**: Multiple users can join group chat rooms and broadcast messages to all members.
- **Room Management**: Create and manage chat rooms (private and group).
- **Real-time Communication**: Messages are sent and received in real time using Socket.io.
- **Message Persistence**: All chat history is stored in MongoDB and can be retrieved when users reconnect.

---

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Socket.io Events](#socketio-events)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Technologies

- **Node.js**: JavaScript runtime environment for building the server.
- **Express**: Web framework for handling HTTP requests.
- **MongoDB**: NoSQL database for storing user and chat room data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Socket.io**: Real-time bidirectional event-based communication.
- **JWT**: JSON Web Tokens for authentication and session management.
- **dotenv**: For managing environment variables.

---

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/your-username/BuzzTalk.git
   cd BuzzTalk
   \`\`\`

2. Install dependencies:

   \`\`\`bash
   npm install
   \`\`\`

3. Set up your environment variables (see [Environment Variables](#environment-variables)).

4. Start MongoDB:

   \`\`\`bash
   mongod
   \`\`\`

5. Start the server:

   \`\`\`bash
   npm run start
   \`\`\`

   The server will start running on the port specified in `.env` or default to `5000`.

---

## Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

\`\`\`plaintext
# Server configuration
PORT=5000

# MongoDB connection
MONGO_URI=mongodb://localhost:27017/buzztalk

# JWT secret key
JWT_SECRET=your_secret_key

# Session duration (optional, in seconds)
SESSION_DURATION=86400 # 1 day
\`\`\`

---

## Usage

Once the server is up and running:

1. Use **Postman** or **curl** to test API endpoints for user registration, login, and room management.
2. Open a Socket.io client (or connect from the frontend) to start sending and receiving real-time messages.

### Register a new user:

\`\`\`bash
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
\`\`\`

### Login:

\`\`\`bash
POST /api/login
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
\`\`\`

---

## API Endpoints

### Auth Routes (\`/api\`)

| Route          | Method | Description                    | Authentication |
|----------------|--------|--------------------------------|----------------|
| \`/register\`    | POST   | Register a new user            | No             |
| \`/login\`       | POST   | Log in and get JWT token       | No             |
| \`/users/:id\`   | GET    | Get user by ID                 | Yes            |
| \`/users\`       | GET    | Get all users                  | Yes            |
| \`/users/:id\`   | PUT    | Update user info               | Yes            |
| \`/users/:id\`   | DELETE | Delete user                    | Yes            |

### Room Routes (\`/api/rooms\`)

| Route               | Method | Description                     | Authentication |
|---------------------|--------|---------------------------------|----------------|
| \`/create\`           | POST   | Create a new chat room          | Yes            |
| \`/join/:roomId\`     | POST   | Join an existing room           | Yes            |
| \`/leave/:roomId\`    | POST   | Leave a room                    | Yes            |
| \`/rooms/:roomId\`    | GET    | Get details of a specific room  | Yes            |

---

## Socket.io Events

### Client-Side Events

| Event Name          | Description                                           |
|---------------------|-------------------------------------------------------|
| \`joinPrivateRoom\`    | Join a private room. Requires \`roomId\`.               |
| \`joinGroupRoom\`      | Join a group room. Requires \`groupId\`.                |
| \`privateMessage\`     | Send a message in a private room.                     |
| \`groupMessage\`       | Send a message in a group room.                       |

### Server-Side Events

| Event Name          | Description                                           |
|---------------------|-------------------------------------------------------|
| \`newPrivateMessage\`  | Broadcasts a new message to participants in a room.   |
| \`newGroupMessage\`    | Broadcasts a new message to group members.            |
| \`disconnect\`         | Triggered when a user disconnects from the server.    |

---

## Folder Structure

\`\`\`
BuzzTalk/
└─BackEnd
   ├── controllers/
   │   └── UserController.js         # Handles user-related logic
   ├── middleware/
   │   └── auth.js                   # JWT authentication middleware
   ├── models/
   │   ├── User.js                   # User model schema
   │   └── messageModel.js           # Message model schema
   ├── routes/
   │   ├── authRoutes.js             # Routes for user registration and login
   │   └── chatRoutes.js             # Routes for chat functionalities
   ├── server.js                     # Main server file
   ├── .env                          # Environment configuration
   └── package.json                  # Node.js dependencies and scripts
\`\`\`

---

## Contributing

We welcome contributions to **BuzzTalk**! If you would like to contribute:

1. Fork the repository.
2. Create a new branch for your feature: \`git checkout -b feature-name\`.
3. Commit your changes: \`git commit -m 'Add some feature'\`.
4. Push to the branch: \`git push origin feature-name\`.
5. Create a pull request.

Please make sure to update tests as appropriate.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

