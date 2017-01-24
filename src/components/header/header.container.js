import React, { Component } from 'react';
import { Link } from 'react-router';

class LinkyHeader extends Component {
    render() {
        return (
            <header className="main-header">
                <Link to="/post-create">create</Link>
                <Link to="/">all</Link>
            </header>
        )
    }
};

export default LinkyHeader;