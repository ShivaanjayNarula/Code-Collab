# Code Collab - Real-Time Collaborative Coding Platform

A powerful real-time collaborative code editor that enables teams to code together seamlessly from anywhere in the world. Built with Next.js, Node.js, Socket.IO, and MongoDB.


![Code Collab](https://img.shields.io/badge/Code-Collab-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

[//]: # (## 🌟 Live Demo)

[//]: # ()
[//]: # (- **Frontend**: [https://code-collab-2025.vercel.app/]&#40;https://code-collab-2025.vercel.app/&#41;)

[//]: # (- **Backend API**: [https://code-collab-yfql.onrender.com/]&#40;https://code-collab-yfql.onrender.com/&#41;)

[//]: # (- **WebSocket Server**: [https://code-collab-websockets.onrender.com/]&#40;https://code-collab-websockets.onrender.com/&#41;)

## ✨ Features

### 🚀 Core Features
- **Real-time Collaboration**: Code together with your team in real-time
- **Multi-language Support**: Support for Python, JavaScript, Java, C++, and more
- **Instant Code Execution**: Run code and see results immediately
- **Live Code Preview**: See changes as they happen
- **User Authentication**: Secure signup/login system
- **Room-based Collaboration**: Create and join collaboration spaces
- **Active User Tracking**: See who's currently in the room

### 🎯 Advanced Features
- **AI Code Completion**: Powered by Mistral AI for intelligent code suggestions
- **Real-time Cursor Tracking**: See where other users are typing
- **Code Syntax Highlighting**: Beautiful syntax highlighting for all supported languages
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Dark/Light Theme**: Toggle between themes for comfortable coding

### 🔧 Developer Features
- **WebSocket Communication**: Real-time bidirectional communication
- **RESTful API**: Clean and well-documented API endpoints
- **MongoDB Integration**: Scalable database solution
- **JWT Authentication**: Secure token-based authentication
- **Email Notifications**: Welcome emails for new users

## 🏗️ Tech Stack

### Frontend (Client)
- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Recoil
- **Code Editor**: Monaco Editor with AI integration
- **Real-time**: Socket.io client
- **UI Components**: Radix UI primitives with custom styling

### Backend (Server)
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt for password hashing
- **Real-time**: Socket.io server
- **AI Integration**: Mistral AI for code completion
- **Email Service**: Nodemailer for user notifications

### WebSocket Server
- **Real-time Communication**: Handles live code synchronization
- **Room Management**: Manages collaboration spaces
- **User Tracking**: Tracks active users in real-time

### AI & Services
- **Mistral AI** - Code completion and suggestions
- **MongoDB Atlas** - Cloud database service

## 📁 Project Structure

```
Code Collab/
├── client/                 # Next.js frontend application
│   ├── app/               # App router pages and components
│   │   ├── auth/          # Authentication pages (login/signup)
│   │   ├── collab/        # Collaboration features
│   │   │   ├── create/    # Create new collaboration
│   │   │   ├── join/      # Join existing collaboration
│   │   │   └── space/     # Main collaboration workspace
│   │   └── states/        # Recoil state management
│   ├── components/        # Reusable UI components
│   │   ├── custom/        # Custom components
│   │   └── ui/           # Radix UI components
│   └── public/           # Static assets
├── server/               # Express.js backend
│   ├── api/             # API routes and models
│   │   ├── models/      # Database models
│   │   ├── user_routes.js
│   │   └── collab_routes.js
│   ├── helper/          # Utility functions
│   └── websocket/       # WebSocket server
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm
- MongoDB Atlas Database
- Mistral AI API key
- Git

### Environment Variables

Create `.env` files in both `client/` and `server/` directories:

#### Client (.env.local)
```env
NEXT_PUBLIC_API_URI=http://localhost:4000
NEXT_PUBLIC_WS_URI=http://localhost:4001
```

#### Server (.env)
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MISTRAL_API_KEY=your_mistral_api_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

#### WebSocket Server (.env)
```env
PORT=4001
API_BASE_URL=http://localhost:4000
CORS_ORIGIN=http://localhost:3000
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShivaanjayNarula/Code-Collab.git
   cd Code-Collab
   ```

2. **Install client dependencies**
   ```bash
   cd client
   yarn install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Install WebSocket server dependencies**
   ```bash
   cd websocket
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   node --watch server.js
   ```

2. **Start the WebSocket server**
   ```bash
   cd server/websocket
   node ws-server.js
   ```

3. **Start the frontend application**
   ```bash
   cd client
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- WebSocket Server: http://localhost:4001

## 🚀 Usage

### Getting Started
1. Visit the homepage and sign up for an account
2. Create a new collaboration space or join an existing one
3. Start coding with real-time collaboration!

### Creating a Collaboration
1. Click "Create Collab" on the homepage
2. Choose a name for your collaboration space
3. Share the generated link with your team members

### Joining a Collaboration
1. Use the collaboration link shared by your team
2. Enter your credentials if prompted
3. Start coding together in real-time!

## 🔧 API Endpoints

### Authentication
- `POST /users/signup` - User registration
- `POST /users/login` - User login
- `POST /users/verify` - Email verification

### Collaboration
- `POST /collab/create` - Create new collaboration
- `GET /collab/getActiveUsers` - Get active users in collaboration
- `POST /collab/activeHook` - Update active user status
- `POST /collab/leftHook` - Update user leave status

### AI Code Completion
- `POST /complete` - Get AI-powered code suggestions

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **CORS Protection**: Cross-origin resource sharing protection
- **Input Validation**: Comprehensive input validation and sanitization
- **Rate Limiting**: Protection against abuse

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Dark/Light Theme**: Automatic theme switching
- **Smooth Animations**: Framer Motion for fluid interactions
- **Toast Notifications**: Real-time user feedback
- **Loading States**: Professional loading indicators
- **Error Handling**: User-friendly error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- [Socket.io](https://socket.io/) for real-time communication
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Mistral AI](https://mistral.ai/) for AI code completion

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/ShivaanjayNarula/code-collab/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Happy Coding Together! 🚀** 
