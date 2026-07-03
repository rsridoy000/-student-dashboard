import React, { Component } from 'react';

// ErrorFallback – named as per assignment requirement (Part 10)
class ErrorFallback extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorFallback caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-card">
          <div className="error-icon">⚠️</div>
          <h3 className="error-title">Card Error</h3>
          <p className="error-message">Something went wrong. Please reload the application.</p>
          <button
            className="btn btn-reload"
            onClick={() => window.location.reload()}
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorFallback;
