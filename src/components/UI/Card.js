import React from 'react';
import './Card.css';

const Card = ({ children, variant = 'default', hover = false, className = '', ...props }) => {
  const classes = `card card-${variant} ${hover ? 'card-hover' : ''} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => (
  <div className="card-header">{children}</div>
);

export const CardBody = ({ children }) => (
  <div className="card-body">{children}</div>
);

export const CardFooter = ({ children }) => (
  <div className="card-footer">{children}</div>
);

export const CardImage = ({ src, alt }) => (
  <div className="card-image">
    <img src={src} alt={alt} />
  </div>
);

export default Card;