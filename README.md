# Code Collab - Real-Time Collaborative Coding Platform

A modern, feature-rich collaborative coding platform that enables real-time code editing, AI-powered code completion, and seamless team collaboration.

![Code Collab](https://img.shields.io/badge/Code-Collab-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🚀 Features

### ✨ Core Features
- **Real-time Collaborative Editing**: Multiple users can edit code simultaneously with live synchronization
- **AI Code Completion**: Powered by Mistral AI for intelligent code suggestions
- **Multi-language Support**: Support for various programming languages
- **Live Code Execution**: Run code directly in the browser with real-time output
- **User Authentication**: Secure login/signup system with JWT tokens
- **Active User Tracking**: See who's currently in the collaboration space
- **Code Language Switching**: Dynamically change programming languages during collaboration

### 🎨 User Experience
- **Modern UI/UX**: Beautiful, responsive design with dark/light theme support
- **Real-time Notifications**: Toast notifications for user join/leave events
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme Support**: Dark and light mode with system preference detection

### 🔧 Technical Features
- **WebSocket Integration**: Real-time communication using Socket.io
- **Monaco Editor**: Professional code editor with syntax highlighting
- **State Management**: Recoil for efficient state management
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **Error Handling**: Comprehensive error handling and user feedback

## 🏗️ Architecture

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
- MongoDB database
- Mistral AI API key

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
   git clone <repository-url>
   cd Code-Collab
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
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
   npm run dev
   ```

2. **Start the WebSocket server**
   ```bash
   cd server/websocket
   npm run web-socket
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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- [Socket.io](https://socket.io/) for real-time communication
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Mistral AI](https://mistral.ai/) for AI code completion

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Happy Coding Together! 🚀** 