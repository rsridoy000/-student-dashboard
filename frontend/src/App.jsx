import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import { initialStudents } from './data/students';

/**
 * App.jsx — Root component
 * Part 9: Lifting State Up — all student data lives here
 * Passes data and handlers down to child components via props
 */

const API_BASE_URL = 'http://127.0.0.1:8000/api/students/';

function App() {
  // ── State (Lifting State Up – Part 9) ──────────────────────────
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(false);
  const [notification, setNotification] = useState(null);

  // ── Helpers ────────────────────────────────────────────────────
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // ── Fetch from Django API ──────────────────────────────────────
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        setBackendConnected(true);
        showNotification('Synced with Django database.', 'success');
      } else {
        throw new Error('API error');
      }
    } catch {
      // Offline fallback — use local data/students.js
      setStudents(initialStudents);
      setBackendConnected(false);
      showNotification('Offline mode — using local data.', 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ── Part 6: Add Student (Lifting State Up) ─────────────────────
  const handleAddStudent = async (newStudent) => {
    if (backendConnected) {
      try {
        const res = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newStudent),
        });
        if (res.ok) {
          const created = await res.json();
          setStudents((prev) => [created, ...prev]);
          showNotification(`${newStudent.name} added to database.`);
        } else {
          throw new Error('POST failed');
        }
      } catch {
        showNotification('Failed to save to database.', 'error');
      }
    } else {
      // Offline — update local state only
      const offlineStudent = { ...newStudent, id: Date.now(), created_at: new Date().toISOString() };
      setStudents((prev) => [offlineStudent, ...prev]);
      showNotification(`${newStudent.name} added (offline).`);
    }
  };

  // ── Part 7: Delete Student (Lifting State Up) ──────────────────
  const handleDeleteStudent = async (id) => {
    if (backendConnected) {
      try {
        const res = await fetch(`${API_BASE_URL}${id}/`, { method: 'DELETE' });
        if (res.ok || res.status === 204) {
          setStudents((prev) => prev.filter((s) => s.id !== id));
          showNotification('Student deleted from database.');
        } else {
          throw new Error('DELETE failed');
        }
      } catch {
        showNotification('Failed to delete from database.', 'error');
      }
    } else {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showNotification('Student removed (offline).');
    }
  };

  // ── Render — delegates UI to Home page component ───────────────
  return (
    <Home
      students={students}
      loading={loading}
      backendConnected={backendConnected}
      notification={notification}
      onAddStudent={handleAddStudent}
      onDeleteStudent={handleDeleteStudent}
      onSync={fetchStudents}
    />
  );
}

export default App;
