import axios from 'axios';

const instance = axios.create({
    headers: { 'Content-Type': 'application/json' }
});

const config = {
    baseURl: 'http://swapi.co/api/',
};

const createURL = (path) => {
    return `${config.baseURl}${path}`;
}

const errorHandler = (err) => {
    throw new Error(err);
};

const successHandler = (response) => response.data;

const starWarsAPI = {
    getPeople() {
        const url = createURL('people');

        return instance.get(url)
            .then(successHandler)
            .catch(errorHandler)
    },

    getFilms() {
        const url = createURL('films');

        return instance.get(url)
            .then(successHandler)
            .catch(errorHandler)
    }
};

export default starWarsAPI;