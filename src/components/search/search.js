import React, { Component } from 'react';
import './search.css';

class Search extends Component {
    render() {
        return (
            <div className="header-search">
                <form className="form">
                    <input className="form-input" type="text" onChange placeholder="Search..." />
                </form>
            </div>
        )
    }
};

export default Search;