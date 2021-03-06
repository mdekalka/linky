const headerService = {
    headerMenu: [{
        id: 1,
        name: 'Home',
        ref: '/',
        index: true
    },
    {
        id: 2,
        name: 'Add code',
        ref: '/post-create'
    },
    {
        id: 3,
        name: 'About',
        ref: '/about'
    },
    {
        id: 4,
        name: 'Additional',
        ref: '/additional'
    }],

    getHeaderMenu() {
        return this.headerMenu;
    }
};

export default headerService;