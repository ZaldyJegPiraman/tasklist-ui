# TaskList UI

A modern **Task List frontend application** built with **Angular** and **Angular Material**, featuring user authentication and full CRUD task management.

This project is designed to work with a backend REST API (e.g. ASP.NET Core) using **JWT authentication**.

---

## 🚀 Features

- 🔐 User Registration & Login (JWT-based authentication)
- 🛡️ Protected routes using Auth Guards
- 📋 View all tasks in a clean, professional layout
- ➕ Create new tasks
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- 🧠 Reactive Forms with validation
- 📅 Due date support with Angular Material Datepicker
- 🎯 Task priority & status management
- 🎨 Responsive UI using Angular Material components

---

## 🧱 Tech Stack

- **Angular** (Standalone Components)
- **Angular Material**
- **RxJS**
- **SCSS**
- **JWT Authentication**
- **REST API integration**

---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/ZaldyJegPiraman/tasklist-ui.git
cd tasklist-ui
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the application
```bash
ng serve
```

Open your browser and navigate to:
```
http://localhost:4200
```

---

## 🔐 Authentication Flow

### Register
- Navigate to `/register`
- Create a new account using email and password

### Login
- Navigate to `/login`
- Successful login stores JWT token
- Redirects user to `/tasks`

### Protected Routes
- `/tasks` is protected by an `AuthGuard`
- Unauthorized users are redirected to login

---

## 📋 Task Management

Each task supports:
- **Title** (required)
- **Description**
- **Due Date**
- **Priority** (Low / Medium / High)
- **Status** (To Do / In Progress / Completed)
- **Category**

Actions:
- Click a task to edit
- Delete tasks using the trash icon
- Completed tasks visually differ for clarity

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── auth/          # Login & Register components
│   ├── guards/        # AuthGuard
│   ├── tasks/         # Task list feature
│   ├── services/      # API services
│   └── shared/        # Shared utilities
```

---

## 🔗 Backend API Requirements

This UI expects a backend API providing:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`

The API must:
- Use JWT authentication
- Accept Bearer tokens in `Authorization` header

---

## 🧪 Testing & Build

### Run unit tests
```bash
ng test
```

### Build for production
```bash
ng build
```

---

## 💡 Possible Enhancements

- 🔁 Forgot Password / Reset Password flow
- ✉️ Email verification
- 🌙 Dark mode support
- 🔍 Task filtering & sorting
- 🧲 Drag-and-drop task ordering
- 🔔 Snackbar notifications
- 📊 Task statistics dashboard

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 👤 Author

**Zaldy Jeg M. Piraman**  
Full Stack Developer  
GitHub: https://github.com/ZaldyJegPiraman
