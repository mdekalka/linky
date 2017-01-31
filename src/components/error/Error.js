import React from 'react';
import './error.css';

const ErrorMessage = ({ title = '', message = ''}) => {
    return (
        <div className="error-container">
            {title && <div className="error-title">{title}</div>}   
            {message && <div className="error-message">{message}</div>}
        </div>
    )
};

export default ErrorMessage;