import React, { Component } from 'react';
import './post-profile.css';

import postsService from '../../services/posts.service';

class PostProfile extends Component {
    getPostById(id) {
        const activePost = postsService.getPostById(parseInt(id));

    }

    componentDidMount() {
        this.getPostById(this.props.params.id);
    }

    render() {
        return (
            <div className="post-profile">sdfdf</div>
        )
    }
};

export default PostProfile;