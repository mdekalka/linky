import React, { PropTypes } from 'react';
import './loader.css';

const Loader = ({ size = '', children }) => {
    return (
        <div className="loader">
            {children && <div className="loader-title">{children}</div>}
            <div className={`leaf-loader ${size}`}></div>
        </div>
    )
};

Loader.propTypes = {
    size: PropTypes.string,
    children: PropTypes.node
};

export default Loader;