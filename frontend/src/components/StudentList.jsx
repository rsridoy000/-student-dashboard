import React from 'react';

const StudentList = ({ studentCount, children }) => {
  
  // Method A: if...else statement
  const getBatchMessageIfElse = (count) => {
    let msg = '';
    if (count === 0) {
      msg = 'No Students Found';
    } else if (count >= 1 && count <= 5) {
      msg = 'Small Batch';
    } else {
      msg = 'Large Batch';
    }
    return msg;
  };

  // Method B: switch statement
  const getBatchMessageSwitch = (count) => {
    switch (true) {
      case count === 0:
        return 'No Students Found';
      case count >= 1 && count <= 5:
        return 'Small Batch';
      default:
        return 'Large Batch';
    }
  };

  // Method C: ternary operator
  const getBatchMessageTernary = (count) => {
    return count === 0 
      ? 'No Students Found' 
      : count <= 5 
        ? 'Small Batch' 
        : 'Large Batch';
  };

  // Resolve the badge class based on count
  const getBadgeClass = (count) => {
    if (count === 0) return 'batch-empty';
    if (count <= 5) return 'batch-small';
    return 'batch-large';
  };

  // We invoke all three as required by the assignment instructions (Part 5)
  const messageIfElse = getBatchMessageIfElse(studentCount);
  const messageSwitch = getBatchMessageSwitch(studentCount);
  const messageTernary = getBatchMessageTernary(studentCount);
  
  // Use ternary resolved message for clean single badge UI
  const displayMessage = messageTernary; 
  const badgeClass = getBadgeClass(studentCount);

  return (
    <div className="student-list-section">
      <div className="list-header">
        <h2 className="list-title">Registered Students</h2>
        
        {/* Render a single premium batch status badge for a clean UI */}
        <div className="batch-banners">
          <div className={`batch-badge ${badgeClass}`} title={`Resolved via: if...else ("${messageIfElse}"), switch ("${messageSwitch}"), ternary ("${messageTernary}")`}>
            {displayMessage}
          </div>
        </div>
      </div>

      {studentCount === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p className="empty-text">No students registered yet. Add one using the form above!</p>
        </div>
      ) : (
        <div className="student-grid">
          {/* Component Composition: Render the children passed from the parent */}
          {children}
        </div>
      )}
    </div>
  );
};

export default StudentList;
