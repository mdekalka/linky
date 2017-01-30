import React, { Component } from 'react';
import './header.css';

import HeaderMenu from './header-menu/HeaderMenu';
import headerService from '../../services/header.service';

class Header extends Component {
    componentWillMount() {
        this.menu = headerService.getHeaderMenu();
    }

    render() {
        return (
            <header className="main-header">
                <nav className="main-nav">
                    <HeaderMenu list={this.menu} />
                </nav>
            </header>
        )
    }
};

export default Header;