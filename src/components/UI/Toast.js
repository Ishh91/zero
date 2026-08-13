import React, { useState, useEffect } from 'react';
import './Toast.css';

let toastListeners = [];

export const showToast = (message, type = 'info', duration = 3500) => {
  const id = Date.now() + Math.random().toString(36).substr(2, 9);
  const newToast = { id, message, type, duration };
  toastListeners.forEach(listener => listener(newToast));
};

export const toast = {
  success: (msg, duration) => showToast(msg, 'success', duration),
  error: (msg, duration) => showToast(msg, 'error', duration),
  info: (msg, duration) => showToast(msg, 'info', duration),
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const addToast = (toastItem) => {
      setToasts(prev => [...prev, toastItem]);

      if (toastItem.duration > 0) {
        setTimeout(() => {
          removeToast(toastItem.id);
        }, toastItem.duration);
      }
    };

    toastListeners.push(addToast);
    return () => {
      toastListeners = toastListeners.filter(l => l !== addToast);
    };
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast-item toast-${t.type}`} role="alert">
          <span className="toast-icon">
            {t.type === 'success' && '✓'}
            {t.type === 'error' && '✕'}
            {t.type === 'info' && 'ℹ'}
          </span>
          <span className="toast-message">{t.message}</span>
          <button className="toast-close" onClick={() => removeToast(t.id)} aria-label="Close notification">
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
