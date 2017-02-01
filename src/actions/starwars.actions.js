import { fork, call, put, takeLatest, takeEvery} from 'redux-saga/effects';

import starWarsAPI from '../services/starwars.service';

export const requestLoadingPeople = () => {
    return {
        type: 'PEOPLE_LOAD_REQUEST'
    }
};

export const requestLoadingFilms = () => {
    return {
        type: 'FILMS_LOAD_REQUEST'
    }
};

const successLoadingPeople = (data) => {
    return {
        type: 'PEOPLE_LOAD_SUCCESS',
        data
    }
};

const successLoadingFilms = (data) => {
    return {
        type: 'FILMS_LOAD_SUCCESS',
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

const failureLoadingFilms = (errorMessage) => {
    return {
        type: 'FILMS_LOAD_FAILURE',
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
        });
};

export const loadFilms = () => (dispatch) => {
    dispatch(requestLoadingFilms());

    return starWarsAPI.getFilms()
        .then((data) => {
            dispatch(successLoadingFilms(data.results));
        })
        .catch(error => {
            dispatch(failureLoadingFilms(error));
        });
}

export const requestLoadingPeopleSaga = (resolve, reject) => {
    return {
        type: 'PEOPLE_LOAD_REQUEST_SAGA',
        resolve,
        reject
    }
};

export const requestLoadingFilmsSaga = (resolve, reject) => {
    return {
        type: 'FILMS_LOAD_REQUEST_SAGA',
        resolve,
        reject
    }
};

// pass resolve, reject to generator fn, to return it to the component itself
const loadPeopleWithSage = function*({ resolve, reject }) {
    try {
        const data = yield call(starWarsAPI.getPeople);

        // dispatch an success action
        yield put(successLoadingPeople(data.results));
        // call resolve if needed with any data you want
        yield call(resolve, { done: 'People Saga is done'});
    } catch (error) {
        // dispatch an failure action
        yield put(failureLoadingPeople(error));
        // call reject with any error
        yield call(reject, { error });
    }
};

const loadFilmsWithSage = function*({ resolve, reject }) {
    try {
        const data = yield call(starWarsAPI.getFilms);

        // dispatch an success action
        yield put(successLoadingFilms(data.results));
        // call resolve if needed with any data you want
        yield call(resolve, { done: 'Films Saga is done'});
    } catch (error) {
        // dispatch an failure action
        yield put(failureLoadingFilms(error));
        // call reject with any error
        yield call(reject, { error });
    }
};

export const sagaLoadPeople = function*() {
    yield takeEvery('PEOPLE_LOAD_REQUEST_SAGA', loadPeopleWithSage);
}

export const sagaLoadFilms = function*() {
    yield takeEvery('FILMS_LOAD_REQUEST_SAGA', loadFilmsWithSage);
}

export function* root() {
    yield [
        fork(sagaLoadPeople),
        fork(sagaLoadFilms),
    ]
}

