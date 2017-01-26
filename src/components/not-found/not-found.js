import React from 'react';
import { Link } from 'react-router';
import './not-found.css';

import notFoundImg from '../../assets/images/sorry.jpg';

const NotFound = () => {
    return (
        <div className="flex-center">
            <div className="not-found-container">
                <img src={notFoundImg} alt="page not found" />
                <Link className="btn btn-apply" to='/'>Bring me Home</Link>
            </div>
        </div>
    )
};

export default NotFound;