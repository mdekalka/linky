import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './additional.css';
import { loadPeople, requestLoadingPeople } from '../../actions/starwars.actions';

class Additional extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'a'
        };

        this.loadPeople = props.loadPeople;
        this.requestLoadingPeople = props.requestLoadingPeople;
    }

    componentDidMount() {
        this.requestLoadingPeople()
        // this.loadPeople();
    }

    getPeople() {
        this.loadPeople().then(() => {
            // people were successfully loaded
        })
    }

    render() {
        const { name } = this.state;
        const { starWars: { people, actions } } = this.props;

        return (
            <div className="additional-container">
                <div>Just page with some additiona testing of Redux-saga, recompose, normalizr, etc.</div>
                {people.items.map(character => {
                    return <div>{character.name}</div>
                })}
                <div>
                    <h4>Action performed</h4>
                    {actions.map(action => {
                        return <div>{action}</div>
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        starWars: state.starWars
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPeople: bindActionCreators(loadPeople, dispatch),
        requestLoadingPeople: bindActionCreators(requestLoadingPeople, dispatch)
    }
}

Additional = connect(mapStateToProps, mapDispatchToProps)(Additional);

export default Additional;