import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null, errorInfo: ErrorInfo | null}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem', color: '#990000', backgroundColor: '#FFF0F0', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ borderBottom: '2px solid #FFCCCC', paddingBottom: '1rem' }}>Application Crash Detected</h1>
          <p style={{ fontWeight: 'bold', marginTop: '2rem' }}>Error Details:</p>
          <pre style={{ backgroundColor: '#FFE0E0', padding: '1rem', borderRadius: '8px', overflowX: 'auto' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <p style={{ fontWeight: 'bold', marginTop: '2rem' }}>Component Stack Trace:</p>
          <pre style={{ backgroundColor: '#FFE0E0', padding: '1rem', borderRadius: '8px', overflowX: 'auto' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>,
);
