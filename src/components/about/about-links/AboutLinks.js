import React, { PropTypes } from 'react';
import './about-links.css';

const AboutLinks = ({ links }) => {
    return (
        <ul className="about-list">
            {links.map(link => {
                return (
                    <li key={link.id} className="about-list-item">
                        <a className="about-list-link" href={link.ref} target="_blank">{link.link}</a>
                        {link.name}
                    </li>
                )
            })}
        </ul>
    )
};

AboutLinks.propTypes = {
    links: PropTypes.array
};

export default AboutLinks;
