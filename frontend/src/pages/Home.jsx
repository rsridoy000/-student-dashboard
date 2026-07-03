import React from 'react';
import Navbar from '../components/Navbar';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import StudentCard from '../components/StudentCard';
import ErrorFallback from '../components/ErrorFallback';

/**
 * Home.jsx — Main page component (Assignment Part 1: pages/ folder)
 * Receives state and handlers from App.jsx via props (Lifting State Up – Part 9)
 * Uses Component Composition with children prop (Part 8)
 */
const Home = ({
  students,
  loading,
  backendConnected,
  notification,
  onAddStudent,
  onDeleteStudent,
  onSync,
}) => {
  return (
    <div className="app-wrapper">
      {/* Part 2: Navbar with dynamic total */}
      <Navbar totalStudents={students.length} />

      <main className="dashboard-container">
        {/* Toast Notification */}
        {notification && (
          <div className={`notification-toast ${notification.type}`}>
            <span className="toast-icon">
              {notification.type === 'success' ? '⚡' : notification.type === 'warning' ? '📡' : '⚠️'}
            </span>
            <span className="toast-text">{notification.message}</span>
          </div>
        )}

        {/* Backend Status Banner */}
        <div className="status-banner">
          <div className="connection-indicator">
            <span className={`status-dot ${backendConnected ? 'connected' : 'disconnected'}`}></span>
            <span className="status-label">
              Django Backend: {backendConnected ? 'Connected (Live DB)' : 'Disconnected (Offline Mode)'}
            </span>
          </div>
          <button onClick={onSync} className="btn-sync" title="Sync with Django Backend">
            🔄 Sync Data
          </button>
        </div>

        <div className="dashboard-grid">
          {/* Part 6: Add Student Form */}
          <section className="form-section">
            <StudentForm onAddStudent={onAddStudent} />
          </section>

          {/* Part 8: Component Composition — StudentList wraps StudentCards as children */}
          <section className="list-section">
            {loading ? (
              <div className="loading-spinner-container">
                <div className="loading-spinner"></div>
                <p>Loading student data...</p>
              </div>
            ) : (
              <StudentList studentCount={students.length}>
                {students.map((student) => (
                  /* Part 10: Each card wrapped in ErrorFallback boundary */
                  <ErrorFallback key={student.id}>
                    {/* Part 3 & 7: StudentCard with props and delete event */}
                    <StudentCard student={student} onDelete={onDeleteStudent} />
                  </ErrorFallback>
                ))}
              </StudentList>
            )}
          </section>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>© 2026 Student Dashboard — React + Vite &amp; Django REST Framework</p>
      </footer>
    </div>
  );
};

export default Home;
