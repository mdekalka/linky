import React, { Component } from 'react';
import _ from 'lodash';
import './search.css';

class Search  extends Component {
    constructor(props) {
        super(props);

        this.delayedEvent = _.throttle(this.delayedEvent, props.ms);
        this.onChange = props.onChange;
    }

    delayedEvent(event) {
        this.onChange({query: event.target.value})
    }

    change = (event) => {
        event.persist();

        this.delayedEvent(event);
    }

    render() {
        return (
            <div className="header-search">
                <form className="form" >
                    <input className="form-input" type="text" onChange={this.change} placeholder="Search post by title" />
                </form>
            </div>
        )
    }
}

export default Search;