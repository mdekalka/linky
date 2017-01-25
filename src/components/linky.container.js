import React, { Component } from 'react';

import './linky.container.css';

import LinkyContent from './posts/posts.container';

class LinkyContainer extends Component {
    render() {
        return (
            <main className="main">
                <LinkyContent />
                <div className="main-wrapper">{this.props.children}</div>
            </main>
        )
    }
}


export default LinkyContainer;
