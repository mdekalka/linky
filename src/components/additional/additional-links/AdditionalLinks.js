import React from 'react';
import { Link } from 'react-router';

const AdditionalLinks = () => {
    return (
        <div>
            <h5>Testing experiments</h5>
            <ul className="about-list">
                <li className="about-list-item"><Link className="about-list-link" to={'/additional/redux-saga'}>redux-saga</Link></li>
            </ul>
        </div>
    )
};

export default AdditionalLinks;
