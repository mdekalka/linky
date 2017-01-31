import React from 'react';
import './loader.css';

const Loader = ({ size = '', children }) => {
    return (
        <div className="loader">
            {children && <div className="loader-title">{children}</div>}
            <div className={`leaf-loader ${size}`}></div>
        </div>
    )
};

export default Loader;