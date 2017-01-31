import React from 'react';
import './about.css';

import aboutService from '../../services/about.service';
import utilsService from '../../services/utils.service';
import AboutLinks from './about-links/AboutLinks';

const About = () => {
    const { getAboutLinks, getl2pLinks } = aboutService;
    const links = utilsService.sortByName(getAboutLinks, 'link');

    return (
        <div className="about-container">
            <div className="about-content">
                <div>Project created using <span className="highlight">React</span> + <span className="highlight">Redux</span></div>
                
                <div className="about-header">Additional libraries used in this project:</div>
                <AboutLinks links={links}></AboutLinks>

                <div className="about-header">Additional libraries to take a look:</div>
                <AboutLinks links={getl2pLinks}></AboutLinks>
            </div>
        </div>
    )
};


export default About;