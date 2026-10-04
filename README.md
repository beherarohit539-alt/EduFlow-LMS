# EduFlow LMS - Full Stack MERN Project

A complete enterprise-grade **Learning Management System (LMS)** built with **MongoDB, Express.js, React.js, and Node.js (MERN)** with Role-Based Access Control (RBAC), Cloudinary CDN integration, and Nodemailer account activation.

---

## 📁 Project Architecture

```
Project LMS/
├── frontend/               # React 18 + Vite + Tailwind CSS + Redux Toolkit
│   ├── src/
│   │   ├── api/            # Axios client with JWT interceptor & mock data
│   │   ├── components/     # Layouts (MainLayout, DashboardLayout) & Common UI
│   │   ├── pages/          # Public, Student, Instructor & Super Admin pages
│   │   ├── redux/          # Redux Toolkit store & 4 Slices (auth, course, enrollment, ui)
│   │   └── routes/         # AppRoutes, ProtectedRoute, RoleRoute (RBAC)
│   └── package.json
│
└── backend/                # Node.js + Express.js + Mongoose + JWT + Cloudinary + Nodemailer
    ├── config.js           # Configuration loader (PORT 8000, DB_URL, JWT secrets)
    ├── app.js              # Express app, CORS (5173 & 3000), body-parser, cookie-parser
    ├── server.js           # Cloudinary init & Server listener
    ├── models/             # User, Course, Order, Notification, Layout
    ├── controllers/        # Auth, Course, Order, Notification, Analytics, Layout
    ├── routes/             # RESTful API routers mounted at /api/v1/*
    ├── middlewares/        # Error handler, isAuthenticated, authorizeRoles
    ├── utils/              # MongoDB connection, sendMail (Nodemailer + EJS)
    └── package.json
```

---

## 🚀 How to Run the Project

### 1. Start the Backend Server (Port 8000)
Open your first terminal:
```bash
cd backend
npm run dev
```
- **Backend URL**: `http://localhost:8000`
- **Health Check API**: `http://localhost:8000/test`
- **Database**: MongoDB connected

### 2. Start the Frontend Application (Port 5173)
Open your second terminal:
```bash
cd frontend
npm run dev
```
- **Frontend URL**: `http://localhost:5173`

---

## 🔗 Connected RESTful Endpoints

| Resource | Route Path | Description | Access |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST /api/v1/auth/registration` | Register account & send activation OTP | Public |
| **Auth** | `POST /api/v1/auth/activate-user` | Verify 6-digit OTP code & activate user | Public |
| **Auth** | `POST /api/v1/auth/login` | Login user & issue JWT tokens | Public |
| **Auth** | `GET /api/v1/auth/logout` | Logout user & clear cookies | Authenticated |
| **Course** | `GET /api/v1/course/get-courses` | Get all published courses | Public |
| **Course** | `GET /api/v1/course/get-course/:id` | Get single course preview & curriculum | Public |
| **Course** | `POST /api/v1/course/create-course` | Publish new course with curriculum | Instructor / Admin |
| **Order** | `POST /api/v1/order/create-order` | Enroll in course & add to user dashboard | Authenticated |
| **Admin** | `GET /api/v1/auth/get-users` | Get user list for RBAC management | Admin |
| **Admin** | `PUT /api/v1/auth/update-user-role` | Promote/demote user role | Admin |
