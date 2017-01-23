import _ from 'lodash';

import utilsService from './utils.service';

const postsService = {
    labels: [
            {
                id: 1,
                name: 'JavaScript',
                image: '/icons/js.svg'
            },
            {
                id: 2,
                name: 'React',
                image: '/icons/react.svg'
            },
            {
                id: 3,
                name: 'Redux',
                image: '/icons/redux.svg'
            },
            {
                id: 4,
                name: 'Angular',
                image: '/icons/angular.svg'
            }
    ],

    getLabels() {
        return this.labels;
    },

    prepareNewItem(config) {
        const defaultConfig = {
            isFavourite: false,
            date: utilsService.getCurrentTime()
        };

        return _.assign(config, defaultConfig);
    }
};

export default postsService;