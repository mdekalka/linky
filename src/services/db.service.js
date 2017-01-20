import axios from 'axios';

const instance = axios.create({
    headers: { 'Content-Type': 'application/json' }
});

const config = {
    baseURl: 'https://api.mlab.com/api/1/databases/piupiupiu/collections/posts',
    api: '?apiKey=rHh_cnP2cfcfQSDz_LEqwP6G0YV2MyHC'
};

const createUrl = (param = '') => {
    return `${config.baseURl}/${param}${config.api}`;
};

const errorHandler = (err) => {
    throw new Error(err);
};

const successHandler = (response) => response.data;

const dbService = {
    getPosts() {
        const url = createUrl();

        return instance({
            method: 'GET',
            url
        })
        .then(successHandler)
        .catch(errorHandler);
    },

    updatePost(id, favourite) {
        const url = createUrl(id);

        return instance({
            method: 'PUT',
            url,
            data: {
                "$set": favourite
            }
        })
        .then(successHandler)
        .catch(errorHandler);
    },

    addPost(post) {
        const url = createUrl();

        return instance({
              method: 'POST',
              url,
              data: post
        })
        .then(successHandler)
        .catch(errorHandler);
    }
};

export default dbService;