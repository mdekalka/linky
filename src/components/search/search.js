import React, { Component } from 'react';
import _ from 'lodash';
import './search.css';

class Search  extends Component {
    constructor(props) {
        super(props);

        this.delayedEvent = _.throttle(this.delayedEvent, props.ms);
        this.onChange = props.onChange;

        this.state = {
            value: ''
        };
    }

    delayedEvent(value) {
        this.onChange({query: value})
    }

    change = (event) => {
        event.persist();
        const { value } = event.target;

        this.setState({ value });
        this.delayedEvent(value);
    }

    resetValue(query, value) {
        return !query ? '' : value;
    }

    render() {
        const { query } = this.props;
        let { value } = this.state;

        value = this.resetValue(query, value);

        return (
            <div className="header-search">
                <form className="form" >
                    <input className="form-input" type="text" value={value} onChange={this.change} placeholder="Search post by title" />
                </form>
            </div>
        )
    }
}

export default Search;