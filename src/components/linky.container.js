import React, { Component } from 'react';
import cuid from 'cuid';
import classNames from 'classnames';
import { Link } from 'react-router';

import './linky.container.css';

import LinkyHeader from './header/header.container';
import LinkyContent from './posts/posts.container';


class LinkyContainer extends Component {
    render() {
        return (
            <div>
                <LinkyHeader />
                <div className="flex-row">
                    <LinkyContent />
                    {this.props.children}
                </div>
                <div>footer</div>
            </div>
        )
    }
}


export default LinkyContainer;
