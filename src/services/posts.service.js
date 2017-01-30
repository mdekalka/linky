import _ from 'lodash';

import utilsService from './utils.service';

const postsService = {
    labels: [
            {
                id: 1,
                name: 'javascript',
                image: '/icons/js.svg'
            },
            {
                id: 2,
                name: 'react',
                image: '/icons/react.svg'
            },
            {
                id: 3,
                name: 'redux',
                image: '/icons/redux.svg'
            },
            {
                id: 4,
                name: 'angular',
                image: '/icons/angular.svg'
            }
    ],

    getLabels() {
        return this.labels;
    },

    prepareNewItem(config) {
        const defaultConfig = {
            date: utilsService.getCurrentTime(),
            tags: config.tags.filter(tag => !! tag)
        };

        return _.assign(config, defaultConfig);
    }
};

export default postsService;