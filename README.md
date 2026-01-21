# TaskList UI (Angular)

A modern **Task List frontend application** built with **Angular** and **Angular Material**, featuring secure authentication, full CRUD task management, and **AI-powered task insights**.

This project works with the **TaskList API (ASP.NET Core)** using **JWT authentication** and AI endpoints.

---

## 🚀 Features

### Core Features
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

### 🤖 AI Features (New)
- 🧠 **AI Task Summary**
  - Generates a **human-friendly, conversational summary** of your tasks
  - Includes:
    - Overview of total tasks
    - Tasks due **today**
    - Tasks due in the **next 7 days**
  - Tasks are grouped and explained clearly (not raw data)

- 📄 **AI Document Analysis**
  - Upload a `.txt` or `.docx` or `.pdf` document
  - AI extracts:
    - Summary of the document
    - Actionable tasks
    - Due dates
    - People mentioned
  - Extracted tasks can be **added directly** to your task list

---

## 🧱 Tech Stack

- **Angular** (Standalone Components)
- **Angular Material**
- **RxJS**
- **SCSS**
- **JWT Authentication**
- **REST API Integration**
- **AI-powered endpoints (LLM-backed)**

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

Open your browser at:
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
- `/tasks`, `/ai/summary`, and `/ai/analyze` are protected by `AuthGuard`
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
- Completed tasks are visually distinct

---

## 🤖 AI Pages

### 🧠 AI Task Summary
Route:
```
/ai/summary
```
- Displays a styled AI-generated summary
- Tasks are grouped by urgency
- Uses clear sections and bullet separation

### 📄 AI Analyze Document
Route:
```
/ai/analyze
```
- Upload documents (`.txt`, `.docx`, `.pdf`)
- AI extracts tasks and metadata
- Each extracted task can be added with one click

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── auth/          # Login & Register
│   ├── guards/        # AuthGuard
│   ├── tasks/         # Task CRUD
│   ├── ai/            # AI Summary & Analyze pages
│   ├── services/      # API & AI services
│   └── shared/        # Shared UI & utilities
```

---

## 🔗 Backend API Requirements

The UI expects these API endpoints:

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`

### AI
- `GET /api/ai/summary`
- `POST /api/ai/analyze-document`

API must:
- Use JWT authentication
- Accept `Authorization: Bearer <token>`

---

## 🧪 Testing & Build

### Unit tests
```bash
ng test
```

### Production build
```bash
ng build
```

---

## 💡 Future Enhancements

- 🌙 Dark mode
- 🔍 Task filtering & sorting
- 📊 Task analytics dashboard
- 🔔 Snackbar notifications
- 🧠 Smarter AI prioritization suggestions

---

## 👤 Author

**Zaldy Jeg M. Piraman**  
Full Stack Developer  
GitHub: https://github.com/ZaldyJegPiraman

---

## 📄 License

MIT License
