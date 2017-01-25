import React, { Component } from 'react';
import './search.css';
import _ from 'lodash';

class Search extends Component {
    constructor(props) {
        super(props);

        this.onUpdateFilters = _.throttle(props.onUpdateFilters, props.throttle);
    }

    update = (event) => {
        // SyntheticEvent object will be reused and all properties will be nullified after the event callback has been invoked. 
        // Link: [https://facebook.github.io/react/docs/events.html#event-pooling]
        event.persist();

        this.onUpdateFilters({ query: event.target.value });
    }

    render() {
        return (
            <div className="header-search">
                <form className="form">
                    <input className="form-input" type="text" onChange={this.update} placeholder="Search by name" />
                </form>
            </div>
        )
    }
};

export default Search;