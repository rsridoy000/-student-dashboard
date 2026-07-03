import React, { useState } from 'react';

const StudentCard = ({ student, onDelete }) => {
  const [shouldCrash, setShouldCrash] = useState(false);

  // Intentional crash to demonstrate Error Boundary
  if (shouldCrash) {
    throw new Error('Simulated student card crash');
  }

  // 1. Ternary Operator Method to determine status text and CSS class
  const statusLabel = student.is_active ? 'Active' : 'Inactive';
  const statusClass = student.is_active ? 'card-status-active' : 'card-status-inactive';

  return (
    <div className="student-card">
      <div className="card-header">
        <h3 className="student-name">{student.name}</h3>
        {/* 1. Ternary Operator used here for class and text */}
        <span className={`status-pill ${statusClass}`}>{statusLabel}</span>
      </div>

      <div className="card-body">
        <div className="card-info">
          <span className="info-label">Dept:</span>
          <span className="info-value">{student.department}</span>
        </div>
        <div className="card-info">
          <span className="info-label">CGPA:</span>
          <span className="info-value cgpa-val">{student.cgpa.toFixed(2)}</span>
        </div>
      </div>

      <div className="card-status-methods">
        {/* 2. Logical && Method to display active indicator dot */}
        <div className="method-indicator">
          <span className="method-title">Logical && dot: </span>
          {student.is_active && (
            <span className="active-indicator">
              <span className="ping-dot"></span>
              <span className="solid-dot"></span>
              Active Dot
            </span>
          )}
          {!student.is_active && <span className="inactive-dot">Inactive Dot</span>}
        </div>

        {/* 3. IIFE (Immediately Invoked Function Expression) Method */}
        <div className="method-indicator">
          <span className="method-title">IIFE status text: </span>
          {(() => {
            if (student.is_active) {
              return <span className="iife-badge active">● Verified Active</span>;
            } else {
              return <span className="iife-badge inactive">○ Off Duty</span>;
            }
          })()}
        </div>
      </div>

      <div className="card-actions">
        <button 
          onClick={() => setShouldCrash(true)} 
          className="btn btn-crash"
          title="Intentionally crash this card to test the Error Boundary"
        >
          💥 Crash Card
        </button>
        <button 
          onClick={() => onDelete(student.id)} 
          className="btn btn-delete"
          title="Delete this student from the list"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
