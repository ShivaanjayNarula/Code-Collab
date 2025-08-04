# Code-Collab

**Code-Collab** is a modern, real-time collaborative code editor built with Next.js, React, and Socket.io. It enables seamless pair programming, interview practice, and group coding sessions with live code sharing, multi-language support, and instant code execution.

**Live Demo:** [https://code-collab-2025.vercel.app/](https://code-collab-2025.vercel.app/)

---

## 🚀 Features

- **Real-time Collaboration:** Multiple users can join a session and edit code together instantly.
- **Multi-Language Support:** Write and run code in various programming languages.
- **Code Execution:** Instantly run code and view output in the browser.
- **Authentication:** Secure login/signup for personalized sessions.
- **Session Management:** Create, join, and manage collaborative spaces by unique links.
- **Modern UI:** Responsive, beautiful interface with dark mode and custom components.

## 🖼️ Screenshots

Screenshots and demo images are available in the `public/` directory.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Radix UI, Recoil
- **Editor:** Monaco Editor
- **Real-time:** Socket.io
- **State Management:** Recoil
- **Form Validation:** React Hook Form, Zod
- **UI Components:** Custom and Radix UI components

---

## 📁 Folder Structure (Key Parts)

- `app/` — Main Next.js app, including routes for auth, collab, and states
- `components/` — UI and custom components
- `hooks/` — Custom React hooks
- `lib/` — Utility functions
- `public/` — Static assets and images
- `themes/` — Theme files

---

## 🧑‍💻 Getting Started (Local Setup)

This project consists of two codebases: **frontend** (this repo) and **backend**.

### 1. Clone the repositories

```bash
git clone https://github.com/Shivaanjay/Code-Collab.git
```

### 2. Install dependencies (Frontend)

```bash
cd client
pnpm install # or npm install or yarn install
```

### 3. Configure environment variables

- Copy `.env.example` to `.env.local` and fill in required values (if present).

### 4. Run the development server

```bash
pnpm dev # or npm run dev or yarn dev
```

### 5. Start the backend server

Follow instructions in the backend repo: [Code-Collab-backend](https://github.com/ShivaanjayNarula/Code-Collab/server)

---

## 🤝 Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

---

## 📄 License

This project is licensed under the MIT License.
