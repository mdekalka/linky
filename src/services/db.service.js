import axios from 'axios';

const instance = axios.create({
    headers: { 'Content-Type': 'application/json' }
});

const config = {
    baseURl: 'https://api.mlab.com/api/1/databases/piupiupiu/collections/posts',
    api: 'apiKey=rHh_cnP2cfcfQSDz_LEqwP6G0YV2MyHC',
    page: 0,
    pageSize: 10
};

const createUrl = (id = '', params = '') => {
    return `${config.baseURl}/${id}?${params}${config.api}`;
};

const errorHandler = (err) => {
    throw new Error(err);
};

const successHandler = (response) => {
    config.page += config.pageSize;

    return response.data;
};

const dbService = {
    getPosts() {
        const url = createUrl('', `&sk=${config.page}&l=${config.pageSize}&`);

        return instance({
            method: 'GET',
            url
        })
        .then(successHandler)
        .catch(errorHandler);
    },

    updatePost(id, model) {
        const url = createUrl(id);

        return instance({
            method: 'PUT',
            url,
            data: {
                "$set": model
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
    },

    deletePost(id) {
        const url = createUrl(id);

        return instance({
              method: 'DELETE',
              url
        })
        .then(successHandler)
        .catch(errorHandler);
    }
};

export default dbService;