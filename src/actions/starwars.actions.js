import { take, call, put, takeEvery} from 'redux-saga/effects';

import starWarsAPI from '../services/starwars.service';

export const requestLoadingPeople = () => {
    return {
        type: 'PEOPLE_LOAD_REQUEST'
    }
};

const successLoadingPeople = (data) => {
    return {
        type: 'PEOPLE_LOAD_SUCCESS',
        data
    }
};

const failureLoadingPeople = (errorMessage) => {
    return {
        type: 'PEOPLE_LOAD_FAILURE',
        error: true,
        errorMessage
    }
};

export const loadPeople = () => (dispatch) => {
    dispatch(requestLoadingPeople());

    return starWarsAPI.getPeople()
        .then((data) => {
            dispatch(successLoadingPeople(data.results));
        })
        .catch(error => {
            dispatch(failureLoadingPeople(error));
        })
};


const loadPeopleWithSage = function*() {
        try {
            const data = yield call(starWarsAPI.getPeople);

            yield put(successLoadingPeople(data.results));
        } catch (error) {
            yield put(failureLoadingPeople(error));
        }
};

export const sagaLoadPeople = function*() {
    yield takeEvery('PEOPLE_LOAD_REQUEST', loadPeopleWithSage);
}

