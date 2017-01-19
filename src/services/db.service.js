import axios from 'axios';

const instance = axios.create({
    headers: { 'Content-Type': 'application/json' }
});

const config = {
    baseURl: 'https://api.mlab.com/api/1/databases/piupiupiu',
    api: '?apiKey=rHh_cnP2cfcfQSDz_LEqwP6G0YV2MyHC',
    collections: 'collections/posts'
};

const createUrl = (path) => {
    return `${config.baseURl}/${path}${config.api}`;
};

const errorHandler = (err) => {
    throw new Error(err);
};

const successHandler = (response) => response.data;

const dbService = {
    getPosts() {
        const url = createUrl(config.collections);

        return instance({
            method: 'GET',
            url
        })
        .then(successHandler)
        .catch(errorHandler);
    },

    addPost(post) {
        const url = createUrl(config.collections);

        return instance({
              method: 'post',
              url,
              data: post
        })
        .then(successHandler)
        .catch(errorHandler);
    }
};

export default dbService;