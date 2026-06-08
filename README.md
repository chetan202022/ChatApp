# ChatApp 💬

A full-stack real-time chat application built using the MERN stack and Socket.IO. The application enables authenticated users to communicate instantly, track online/offline status, verify accounts through email, and view message delivery status in real time.

## 🚀 Live Demo

https://chatapp-j4hc.onrender.com

## 📂 Source Code

https://github.com/chetan202022/ChatApp

---

## ✨ Features

* User Registration & Login
* JWT Authentication
* Email Verification via Nodemailer
* Secure Password Hashing with bcrypt
* Real-Time Messaging using Socket.IO
* Online / Offline User Presence
* Message Seen Status
* Protected Routes
* Responsive User Interface
* MongoDB Atlas Integration
* Production Deployment on Render

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Zustand
* Axios
* Tailwind CSS
* DaisyUI
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO
* JWT Authentication
* bcryptjs
* Nodemailer

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Render

<!--
---
## 📸 Screenshots

| Login | Signup |
|--------|--------|
| ![](./screenshots/login.png) | ![](./screenshots/signup.png) |

| Dashboard | Chat |
|------------|------|
| ![](./screenshots/dashboard.png) | ![](./screenshots/chat.png) |
-->
---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/chetan202022/ChatApp.git
cd ChatApp
```

### Backend Setup

```bash
cd Backend
npm install
```

### Frontend Setup

```bash
cd Frontend
npm install
```

### Environment Variables

Create a `.env` file in the Backend directory.

```env
PORT=4002
MONGODB_URI=your_mongodb_connection_string
JWT_TOKEN=your_jwt_secret
EMAIL=your_email
EMAIL_PASS=your_email_app_password
FRONTEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:4002
```

### Run Application

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

---

## 📊 Performance Testing

Performance testing was conducted using Apache JMeter and Artillery.

### Results

| Metric                           | Result                    |
| -------------------------------- | ------------------------- |
| Concurrent Socket.IO Connections | 6000+                     |
| API Throughput                   | 3.7 req/sec → 51+ req/sec |
| Average Response Time            | 2.1s → 2ms                |
| Real-Time Messaging              | Low Latency               |

---

## 🔐 Authentication Flow

1. User registers.
2. Verification email is sent.
3. User verifies account through email link.
4. JWT token is issued.
5. User accesses protected routes.
6. Real-time communication begins through Socket.IO.

---

## 👨‍💻 Author

**Chetan Yadav**

* LinkedIn: https://linkedin.com/in/chetan-yadav-a21b0a289
* GitHub: https://github.com/chetan202022
* LeetCode: https://leetcode.com/u/Chetan__10/

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
