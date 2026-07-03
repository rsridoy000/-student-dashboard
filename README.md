# Student Dashboard — React + Vite & Django REST Framework

A full-stack **Student Dashboard** application featuring a premium dark terminal-themed UI with neon accents, built with **React + Vite** (frontend) and **Django + Django REST Framework** (backend).

## 🔗 GitHub Repository

[![GitHub](https://img.shields.io/badge/GitHub-Repository-green?logo=github&logoColor=white&style=for-the-badge)](https://github.com/rsridoy000/-student-dashboard)

**Repository URL:** `https://github.com/rsridoy000/-student-dashboard`

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Vanilla CSS3, HTML5 |
| Backend | Python, Django 6, Django REST Framework |
| Database | SQLite (local development) |
| Fonts | JetBrains Mono, Space Grotesk (Google Fonts) |

---

## 🎨 Design Theme — Dark Terminal Neon

| UI Area | Background | Text / Accent |
|---|---|---|
| Body / Screen | `#0A0A0A` Pure Black | `#E8E8E8` Light Grey |
| Navigation Bar | `#050505` Pitch Black | `#00FF88` Neon Green |
| Form & Cards | `#141414` Dark Surface | `#E8E8E8` / `#00E5FF` Aqua |
| Add Student Button | `#00FF88` Neon Green | `#000000` Black |
| Delete Button | `#FF4444` Red | `#FFFFFF` White |
| Active Status | `rgba(0,255,136,0.12)` | `#00FF88` Neon Green |
| Inactive Status | `rgba(255,60,60,0.12)` | `#FF4444` Red |
| CGPA Values | — | `#FFE600` Neon Yellow |
| Section Titles | — | `#00E5FF` Neon Aqua |

---

## ✅ Assignment Requirements Coverage

### Part 1: Project Setup
- Vite + React project with organized folder structure
- Folders: `components/`, `pages/`, `data/`, `assets/` under `src/`

### Part 2: Navbar Component
- Reusable `Navbar.jsx` displays **"Student Dashboard"** and **dynamic total count**

### Part 3: Student Card Component
- Reusable `StudentCard.jsx` receives `student` and `onDelete` as **props**
- Displays: Name, Department, CGPA, Active Status in a card layout

### Part 4: Student List & Conditional Rendering (Status)
- `data/students.js` — array of student objects with `id`, `name`, `department`, `cgpa`, `is_active`
- Rendered using `students.map(...)`
- **3 JSX techniques** for active/inactive status display:
  1. **Ternary Operator** — status pill label and CSS class
  2. **Logical `&&`** — animated neon green dot (shown only when active)
  3. **IIFE** — returns custom badge text

### Part 5: Conditional Rendering (Batch Size)
- Batch size message: `"No Students Found"` / `"Small Batch"` / `"Large Batch"`
- Implemented using **all 3 approaches**:
  1. `if...else` statement
  2. `switch` statement
  3. Ternary operator

### Part 6: Add Student Form
- Controlled inputs for Name, Department, CGPA using `useState`
- `e.preventDefault()` prevents page refresh
- New student added to list after submission

### Part 7: Events
- Each `StudentCard` has a **Delete button**
- Clicking removes the student from the list

### Part 8: Component Composition
```jsx
<App>
  <Home>
    <Navbar />
    <StudentList>       {/* uses children prop */}
      <StudentCard />
    </StudentList>
  </Home>
</App>
```

### Part 9: Lifting State Up
- All student data stored in `App.jsx`
- Data and handler functions passed to `Home` → child components via **props**

### Part 10: Error Boundary
- `ErrorFallback.jsx` — class-based error boundary component
- Each `StudentCard` wrapped in `<ErrorFallback>`
- **💥 Crash Card** button intentionally throws an error
- Fallback message displayed: **"Something went wrong. Please reload the application."**

---

## 📂 Folder Structure

```
student-dashboard/
├── setup.bat                ← Double-click to auto-setup & run
├── .gitignore
├── README.md
│
├── backend/
│   ├── student_api/         # Django project settings & root URLs
│   │   ├── settings.py
│   │   └── urls.py
│   ├── students/            # Students Django app
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── requirements.txt
│   ├── seed_db.py
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StudentCard.jsx
│   │   │   ├── StudentList.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── ErrorFallback.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── data/
│   │   │   └── students.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── GitHub Repository Link
```

---

## 🚀 Quick Start — Using setup.bat

> **Requirements:** Python 3.9+ and Node.js 18+ installed

1. Open the project root folder
2. **Double-click `setup.bat`**

The script will automatically:
- ✅ Verify Python & Node.js
- ✅ Create virtual environment (first run only)
- ✅ Install pip & npm dependencies
- ✅ Run Django migrations + seed database
- ✅ Launch Django backend at `http://127.0.0.1:8000`
- ✅ Launch React frontend at `http://localhost:5173`
- ✅ Open the browser automatically

---

## 🛠️ Manual Setup

### Backend
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python seed_db.py
python manage.py runserver
```
> API: `http://127.0.0.1:8000/api/students/`

### Frontend
```powershell
cd frontend
npm install
npm run dev
```
> App: `http://localhost:5173/`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students/` | List all students |
| `POST` | `/api/students/` | Add a new student |
| `DELETE` | `/api/students/{id}/` | Delete a student |

---

## 👤 Author

- **GitHub:** [rsridoy000](https://github.com/rsridoy000)

---

*© 2026 Student Dashboard — React + Vite & Django REST Framework*
