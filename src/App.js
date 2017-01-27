import React, { Component } from 'react';

import Header from './components/header/Header';
import ToolsMenu from './components/tools/ToolsMenu';

class App extends Component {
    render() {
        return (
            <div className="pagewrapper">
                <Header />
                <ToolsMenu />
                {this.props.children}
            </div>
        );
    }
}

export default App;
