import React, { Component } from 'react';

import './additional.css';

class Additional extends Component {
    render() {
        return (
            <div className="additional-container">
                <div className="additional-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Additional;