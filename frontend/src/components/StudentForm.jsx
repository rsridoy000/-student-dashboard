import React, { useState } from 'react';

const StudentForm = ({ onAddStudent }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!name.trim()) {
      setError('Student name is required.');
      return;
    }
    if (!department.trim()) {
      setError('Department is required.');
      return;
    }
    if (cgpa === '') {
      setError('CGPA is required.');
      return;
    }

    const parsedCgpa = parseFloat(cgpa);
    if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 4.0) {
      setError('CGPA must be a valid number between 0.00 and 4.00.');
      return;
    }

    // Call the parent handler
    onAddStudent({
      name: name.trim(),
      department: department.trim(),
      cgpa: parsedCgpa,
      is_active: isActive
    });

    // Reset fields
    setName('');
    setDepartment('');
    setCgpa('');
    setIsActive(true);
  };

  return (
    <div className="form-card">
      <h2 className="form-title">
        <span className="plus-icon">➕</span> Add New Student
      </h2>
      <form onSubmit={handleSubmit} className="student-form">
        {error && <div className="form-error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="student-name">Full Name</label>
          <input
            id="student-name"
            type="text"
            placeholder="e.g. Rahat Kabir"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="student-dept">Department</label>
          <input
            id="student-dept"
            type="text"
            placeholder="e.g. Computer Science"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="student-cgpa">CGPA (out of 4.00)</label>
          <input
            id="student-cgpa"
            type="number"
            step="0.01"
            placeholder="e.g. 3.92"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label" htmlFor="student-active">
            <input
              id="student-active"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="form-checkbox"
            />
            <span className="checkbox-custom"></span>
            <span className="label-text">Set Status as Active</span>
          </label>
        </div>

        <button type="submit" className="btn btn-submit">
          Register Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
