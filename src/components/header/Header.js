import React, { Component } from 'react';
import './header.css';

import Search from '../../components/search/Search';
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
                    <Search />
                    <HeaderMenu list={this.menu} />
                </nav>
            </header>
        )
    }
};

export default Header;