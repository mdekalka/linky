import React, { Component } from 'react';

import postsService from '../../services/posts.service';

class PostProfile extends Component {
    getPostById(id) {
        const activePost = postsService.getPostById(parseInt(id));
        debugger
    }

    componentDidMount() {
        this.getPostById(this.props.params.id);
    }

    render() {
        return (
            <div>sdfdf</div>
        )
    }
};

export default PostProfile;