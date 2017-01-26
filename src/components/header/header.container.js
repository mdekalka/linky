import React, { Component } from 'react';
import { Link } from 'react-router';
import './header.css';

import headerService from '../../services/header.service';

class LinkyHeader extends Component {
    constructor() {
        super();

        this.menu = headerService.getHeaderMenu();

    }

    render() {
        return (
            <header className="main-header">
                <ul className="header-list">
                {this.menu.map(item => {
                    return (
                        <li className="header-list-item" key={item.id}>
                            <Link activeClassName="active" className="header-list-link" onlyActiveOnIndex={item.index} to={item.ref}>{item.name}</Link>
                        </li>
                    )
                })}
                </ul>
            </header>
        )
    }
};

export default LinkyHeader;