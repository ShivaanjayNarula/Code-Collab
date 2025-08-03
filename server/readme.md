# Pair-Code Backend Server

Backend codebase for the collaborative code editor **PairCode**. This repository contains two separate servers:

- **HTTP Server** (`server.js`): Handles REST API endpoints, authentication, and user management.
- **WebSocket Server** (`ws-server.js`): Manages real-time collaborative editing sessions.

## Features

- User authentication (JWT-based)
- Real-time code collaboration via WebSockets
- Email notifications (see `helper/mailService.js`)
- Modular API structure

## Prerequisites

- Node.js (v18 or later recommended)
- npm

## Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the HTTP server:**

   ```bash
   node server.js
   ```

3. **Run the WebSocket server (in a separate terminal):**
   ```bash
   node ws-server.js
   ```

## Docker (HTTP Server Only)

To run the HTTP server in Docker:

1. **Build the Docker image:**

   ```bash
   docker build -t paircode-backend .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 paircode-backend
   ```
   (Change the port if your server uses a different one.)

## Project Structure

```
pair-code-backend/
├── server.js           # Main HTTP server
├── ws-server.js        # WebSocket server
├── api/                # API route handlers and models
│   ├── collab_routes.js
│   ├── jwt.js
│   ├── user_routes.js
│   └── models/
│       ├── db.js
│       └── userModel.js
├── helper/
│   └── mailService.js
├── package.json
└── Dockerfile
```

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss major changes first.

---

For questions, contact the maintainer or open an issue.
