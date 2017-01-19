import angularLogo from '../assets/icons/angular.svg';
import reactLogo from '../assets/icons/react.svg';
import reduxLogo from '../assets/icons/redux.svg';

const postsService = {
    posts:  [{
        id: 1,
        title: 'Super title post',
        label: 'angular',
        image: angularLogo,
        isFavourite: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam tempora magnam quod aspernatur at sunt recusandae magni facilis iure id ipsum ullam obcaecati, incidunt, voluptate. Voluptatum natus, dolores perspiciatis in.',
        date: '11:02 a.m.',
        tags: ['react', 'react', 'react']
    },
    {
        id: 2,
        title: 'Super title post',
        label: 'react',
        image: reactLogo,
        isFavourite: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam tempora magnam quod aspernatur at sunt recusandae magni facilis iure id ipsum ullam obcaecati, incidunt, voluptate. Voluptatum natus, dolores perspiciatis in.',
        date: '14:02 a.m.',
        tags: ['react', 'redux', 'web']
    },
    {
        id: 3,
        title: 'Super title post',
        image: reduxLogo,
        label: 'redux',
        isFavourite: true,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam tempora magnam quod aspernatur at sunt recusandae magni facilis iure id ipsum ullam obcaecati, incidunt, voluptate. Voluptatum natus, dolores perspiciatis in.',
        date: '14:02 a.m.',
        tags: ['react', 'redux', 'web']
    }],

    getPosts() {
        return this.posts;
    },

    getPostById(id) {
        return this.posts.find(post => post.id === id);
    }
}

export default postsService;