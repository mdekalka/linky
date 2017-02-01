import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadPeople, loadFilms, requestLoadingPeopleSaga, requestLoadingFilmsSaga } from '../../../actions/starwars.actions';

class ReduxSaga extends Component {
    constructor(props) {
        super(props);

        this.loadPeople = props.loadPeople;
        this.loadFilms = props.loadFilms;
        this.requestLoadingPeopleSaga = props.requestLoadingPeopleSaga;
        this.requestLoadingFilmsSaga = props.requestLoadingFilmsSaga;
    }

    getDataWithThunk = () => {
        this.loadPeople()
            .then(() => {
                // people were successfully loaded
                return this.loadFilms();
            })
            .then(() => {
                // films were successfully loaded
            })
            .catch(error => {
                console.log(error, 'Error happens');
            });
    }

    promisedGetPeople() {
        return new Promise((resolve, reject) => {
            return this.requestLoadingPeopleSaga(resolve, reject);
        });
    }

    promisedGetFilms() {
        return new Promise((resolve, reject) => {
            return this.requestLoadingFilmsSaga(resolve, reject);
        });
    }

    getDataWithSaga = () => {
        this.promisedGetPeople()
            .then(({ done }) => {
                console.log(done);
                // people were successfully loaded
                return this.promisedGetFilms();
            })
            .then(({ done }) => {
                console.log(done);
                // films were successfully loaded
            })
        .catch((error) => {
            // error happens, reject returned from saga
        })
    }

    render() {
        const { starWars: { actions } } = this.props;

        return (
            <div>
                <div>redux-saga vs redux-thunk</div>
                <div>
                    <button className="btn" onClick={this.getDataWithThunk}>Load people-films with redux-thunk</button>
                    <button className="btn" onClick={this.getDataWithSaga}>Load people-films with redux-saga</button>
                    <div>
                        <h4>Action performed</h4>
                        {actions.map((action, idx)=> {
                            return <div key={idx}>{action}</div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        starWars: state.starWars
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPeople: bindActionCreators(loadPeople, dispatch),
        loadFilms: bindActionCreators(loadFilms, dispatch),
        requestLoadingPeopleSaga: bindActionCreators(requestLoadingPeopleSaga, dispatch),
        requestLoadingFilmsSaga: bindActionCreators(requestLoadingFilmsSaga, dispatch)
    }
};

ReduxSaga = connect(mapStateToProps, mapDispatchToProps)(ReduxSaga);

export default ReduxSaga;