import React, { Component } from 'react';

import './main-content.css';

import PostsView from './posts/posts-view/PostsView';

class MainContent extends Component {
    render() {
        return (
            <main className="main">
                <PostsView />
                <div className="main-wrapper one-half column">{this.props.children}</div>
            </main>
        )
    }
}


export default MainContent;
