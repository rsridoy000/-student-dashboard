# Student Dashboard

> A professional, full-stack **Student Dashboard** application built with **React + Vite** (frontend) and **Django + Django REST Framework** (backend).

---

## 🔗 GitHub Repository

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/rsridoy000/-student-dashboard)

**Repository URL:** `https://github.com/rsridoy000/-student-dashboard`

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Vanilla CSS3, HTML5 |
| Backend | Python, Django 6, Django REST Framework |
| Database | SQLite (local development) |
| Fonts | Google Fonts — Inter, Outfit |

---

## 🎨 Color Scheme

| UI Area | Background | Text Color |
|---|---|---|
| Body / Screen | `#F8FAFC` Off-White | `#1F2937` Dark Grey |
| Navigation Bar | `#1E3A8A` Navy Blue | `#FFFFFF` White |
| Form & Card Box | `#FFFFFF` White | `#1F2937` Dark Grey |
| Add Student Button | `#2563EB` Blue | `#FFFFFF` White |
| Delete Button | `#EF4444` Red | `#FFFFFF` White |
| Active Status | `#DCFCE7` Light Green | `#15803D` Dark Green |
| Inactive Status | `#FEE2E2` Light Red | `#B91C1C` Dark Red |

---

## ✅ Assignment Requirements Coverage

### 1. Project Setup
- Vite + React project initialized under `frontend/`
- Clean folder structure: `components/`, `data/` under `src/`
- Django project initialized under `backend/` with a dedicated `students` app

### 2. State Management & Props (Lifting State Up)
- All student data is stored in `App.jsx` (the Parent component)
- Data and handler functions are passed to child components via **Props**
- **Component Composition**: `StudentList` uses the **children prop** to render `StudentCard` components

### 3. Components Built

| Component | Purpose |
|---|---|
| `Navbar.jsx` | Displays "Student Dashboard" title and **live total student count** |
| `StudentForm.jsx` | Controlled form (useState) with validation; `e.preventDefault()` on submit |
| `StudentCard.jsx` | Displays student details; includes Delete button and Crash button |
| `StudentList.jsx` | Renders all cards via children prop; shows batch size message |
| `ErrorBoundary.jsx` | Class component that catches render errors in child cards |

### 4. Conditional Rendering Methods

**Student Active / Inactive Status** — all 3 required methods used in `StudentCard.jsx`:

```jsx
// 1. Ternary Operator (status label and CSS class)
const statusLabel = student.is_active ? 'Active' : 'Inactive';
const statusClass = student.is_active ? 'card-status-active' : 'card-status-inactive';

// 2. Logical && (animated green dot shown only when active)
{student.is_active && <span className="active-indicator">...</span>}

// 3. IIFE — Immediately Invoked Function Expression
{(() => {
  if (student.is_active) {
    return <span className="iife-badge active">● Verified Active</span>;
  } else {
    return <span className="iife-badge inactive">○ Off Duty</span>;
  }
})()}
```

**Batch Size Message** — all 3 required control structures used in `StudentList.jsx`:

```js
// 1. if...else
if (count === 0)        msg = 'No Students Found';
else if (count <= 5)    msg = 'Small Batch';
else                    msg = 'Large Batch';

// 2. switch
switch (true) {
  case count === 0:  return 'No Students Found';
  case count <= 5:   return 'Small Batch';
  default:           return 'Large Batch';
}

// 3. Ternary
count === 0 ? 'No Students Found' : count <= 5 ? 'Small Batch' : 'Large Batch';
```

### 5. Error Boundary
- `ErrorBoundary.jsx` is a class-based component using `getDerivedStateFromError`
- Every `StudentCard` is individually wrapped inside an `<ErrorBoundary>` 
- Clicking **💥 Crash Card** on any card triggers an intentional error
- The fallback message is displayed **without crashing the rest of the app**:
  > _"Something went wrong. Please reload the application."_

---

## 📂 Folder Structure

```
Ostad Student/
├── setup.bat              ← Double-click to auto-setup & run everything
├── README.md
│
├── backend/
│   ├── student_api/       # Django project settings & root URLs
│   │   ├── settings.py
│   │   └── urls.py
│   ├── students/          # Students Django app
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── venv/              # Python virtual environment (auto-created)
│   ├── requirements.txt
│   ├── seed_db.py         # Initial database seed script
│   └── manage.py
│
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── StudentForm.jsx
    │   │   ├── StudentCard.jsx
    │   │   ├── StudentList.jsx
    │   │   └── ErrorBoundary.jsx
    │   ├── data/
    │   │   └── initialStudents.js   # Offline fallback data
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Quick Start — Using setup.bat

1. Make sure **Python 3.9+** and **Node.js 18+** are installed on your machine.
2. Navigate to the project root folder (`Ostad Student/`)
3. **Double-click `setup.bat`**

The script will automatically:
- ✅ Verify Python & Node.js are available
- ✅ Create a Python virtual environment (first-time only)
- ✅ Install all pip dependencies from `requirements.txt`
- ✅ Run Django database migrations
- ✅ Seed the database with 5 initial student records
- ✅ Install npm packages (first-time only)
- ✅ Launch the **Django backend** at `http://127.0.0.1:8000`
- ✅ Launch the **React frontend** at `http://localhost:5173`
- ✅ Automatically open the browser

---

## 🛠️ Manual Setup (Alternative)

### Backend

```powershell
cd backend

# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Seed initial data
python seed_db.py

# Start the server
python manage.py runserver
```
> API running at: `http://127.0.0.1:8000/api/students/`

### Frontend

```powershell
cd frontend

# Install packages
npm install

# Start development server
npm run dev
```
> App running at: `http://localhost:5173/`

---

## 📡 API Endpoints (Django REST Framework)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students/` | Retrieve all students |
| `POST` | `/api/students/` | Add a new student |
| `GET` | `/api/students/{id}/` | Retrieve a specific student |
| `PUT` | `/api/students/{id}/` | Update a student |
| `DELETE` | `/api/students/{id}/` | Delete a student |

### Sample POST Request Body

```json
{
  "name": "Abir Rahman",
  "department": "Computer Science",
  "cgpa": 3.75,
  "is_active": true
}
```

---

## 💡 Key Features

- **Offline Fallback Mode** — If the Django backend is not running, the app automatically loads mock data from `initialStudents.js` so the UI remains functional
- **Live Sync Button** — Manually re-fetch data from the backend at any time
- **Real-time Count** — The Navbar dynamically shows the current total number of students
- **Form Validation** — Name, Department, and CGPA fields are all validated before submission
- **Error Isolation** — Each student card is independently protected by an `ErrorBoundary`; crashing one card never affects the rest of the page

---

## 👤 Author

- **Name:** *(R S Ridoy)*
- **Batch:** *(2022-2023)*
- **GitHub:** `https://github.com/rsridoy000`

---

*© 2026 Student Dashboard Assignment — React + Vite & Django REST Framework*
