import React, { Component } from 'react';

import LinkyHeader from './components/header/header.container';

class App extends Component {
    render() {
        return (
            <div className="pagewrapper">
                <LinkyHeader />
                {this.props.children}
            </div>
        );
    }
}

export default App;
