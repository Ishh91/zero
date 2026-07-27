import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled, loading, icon, ...props }) => {
  const classes = `btn btn-${variant} btn-${size} ${disabled || loading ? 'disabled' : ''}`;
  
  return (
    <button className={classes} onClick={onClick} disabled={disabled || loading} {...props}>
      {loading && <span className="btn-spinner"></span>}
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
    </button>
  );
};

export default Button;