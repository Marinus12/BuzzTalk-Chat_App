# BuzzTalk Chat Web App

## Overview
BuzzTalk is a real-time chat application that allows users to communicate via private and group chats. Built with Node.js, Express, Socket.IO, and MongoDB, it supports real-time messaging and user authentication.

## Features
- Real-time private and group messaging.
- JWT-based authentication.
- MongoDB for storing users, rooms, and messages.
- Redis for session management (optional).
- Scalable and efficient room-based architecture using Socket.IO.
- Geolocation integration to display users' locations (optional).

## Project Setup

### Prerequisites
Before setting up the project, ensure you have the following:
- Node.js installed (>= v12.x)
- MongoDB connection (local or cloud-based)
- Redis (optional, but recommended for session management)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/buzztalk-chat-web-app.git
    cd buzztalk-chat-web-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following values:
    ```plaintext
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    REDIS_URL=redis://localhost:6379  # Optional
    GEOLOCATION_API_KEY=your_geolocation_api_key  # Optional
    SESSION_DURATION=3600  # 1 hour in seconds
    ```

4. Start the application:
    ```bash
    npm start
    ```

5. Access the app at `http://localhost:5000`.

## API Endpoints
The following API routes are available for the application:

### User Routes:
- `POST /api/register`: Register a new user.
- `POST /api/login`: Login a user.

### Chat Routes:
- `GET /api/messages/:roomId`: Get messages for a specific room.
- `POST /api/messages/:roomId`: Send a message to a room.

### Deployment
To deploy the BuzzTalk application, follow the deployment steps in the [deployment documentation](deployment.md).

## License
This project is licensed under the MIT License.

# Getting Started with Create React App

In the project directory, you can run:

### npm install

Creates the needed node package from the JSON file

### `npm start`

Runs the app in the development mode.\

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**