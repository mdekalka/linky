const aboutLinks = [{
        id: 1,
        ref: 'https://www.npmjs.com/package/axios',
        name: 'Promise based HTTP client',
        link: 'axios'
    },
    {
        id: 2,
        ref: 'https://www.npmjs.com/package/classnames',
        name: 'A simple utility for conditionally joining classNames together',
        link: 'classnames'
    },{
        id: 3,
        ref: 'https://www.npmjs.com/package/redux-thunk',
        name: 'Thunk middleware for Redux',
        link: 'redux-thunk'
    },
    {
        id: 4,
        ref: 'https://www.npmjs.com/package/react-code-mirror',
        name: 'CodeMirror component for React',
        link: 'react-code-mirror'
    },
    {
        id: 5,
        ref: 'https://www.npmjs.com/package/reselect',
        name: 'Selectors for Redux',
        link: 'reselect'
    },
    {
        id: 6,
        ref: 'https://www.npmjs.com/package/redux-logger',
        name: 'Logger for Redux',
        link: 'redux-logger'
    },
    {
        id: 7,
        ref: 'https://www.npmjs.com/package/react-prism',
        name: 'React.js + prismjs syntax hightlight component',
        link: 'react-prism'
    },
    {
        id: 8,
        ref: 'https://www.npmjs.com/package/react-router',
        name: 'A complete routing library for React',
        link: 'react-router'
    },
    {
        id: 9,
        ref: 'https://www.npmjs.com/package/react-svg',
        name: 'React svg component for loading svg files into the DOM',
        link: 'react-svg'
    },
    {
        id: 10,
        ref: 'https://www.npmjs.com/package/react-markdown',
        name: 'Renders Markdown as pure React components',
        link: 'react-markdown'
    },
    {
        id: 11,
        ref: 'https://www.npmjs.com/package/react-infinite-scroller',
        name: 'Infinite scroll component for React',
        link: 'react-infinite-scroller'
    },
    {
        id: 12,
        ref: 'https://www.npmjs.com/package/lodash',
        name: 'Lodash modular utilities.',
        link: 'lodash'
    },
    {
        id: 13,
        ref: 'https://www.npmjs.com/package/promise.prototype.finally',
        name: 'ES Proposal spec-compliant shim for Promise.prototype.finally',
        link: 'promise.prototype.finally'
    },
    {
        id: 14,
        ref: 'https://www.npmjs.com/package/dateformat',
        name: 'Formatting dates',
        link: 'dateformat'
    },
    {
        id: 15,
        ref: 'https://www.npmjs.com/package/cuid',
        name: 'Collision-resistant ids optimized for horizontal scaling and performance',
        link: 'cuid'
}];

const l2pLinks = [{
        id: 1,
        ref: 'https://www.npmjs.com/package/normalizr',
        name: 'Normalizes and denormalizes JSON according to schema for Redux and Flux applications',
        link: 'normalizr'
    },
    {
        id: 2,
        ref: 'https://www.npmjs.com/package/denormalizer',
        name: 'State denormalization for normalizr',
        link: 'denormalizer'
    },
    {
        id: 3,
        ref: 'https://www.npmjs.com/package/redux-actions',
        name: 'Flux Standard Action utlities for Redux',
        link: 'redux-actions'
    },
    {
        id: 4,
        ref: 'https://www.npmjs.com/package/recompose',
        name: 'A React utility belt for function components and higher-order components',
        link: 'recompose'
}];

const aboutService = {
    get getAboutLinks() {
        return aboutLinks
    },

    get getl2pLinks() {
        return l2pLinks;
    }
};

export default aboutService;