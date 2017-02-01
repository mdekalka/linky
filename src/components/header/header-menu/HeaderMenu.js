import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './header-menu.css';

const HeaderMenu = ({ list }) => {
    return (
        <ul className="header-list">
            {list.map(item => {
                return (
                    <li className="header-list-item" key={item.id}>
                        <Link activeClassName="active" className="header-list-link" onlyActiveOnIndex={item.index} to={item.ref}>{item.name}</Link>
                    </li>
                )
            })}
        </ul>
    )
};

HeaderMenu.propTypes = {
    list: PropTypes.array
};

export default HeaderMenu;