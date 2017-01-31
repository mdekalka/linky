import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PostProfile from './post-profile/PostProfile';
import * as postActions from '../../../actions/posts.actions';
import { selectActivePost } from '../../../reducers/posts.reducer';

class PostView extends Component {
    constructor(props) {
        super(props);

        const actions = props.postsActions;

        this.setActivePost = actions.setActivePost;
        this.updatingPost = actions.updatingPost;
        this.deletingPost = actions.deletingPost;
    };

    componentDidMount() {
        this.getPostById(this.props.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.id !== prevProps.params.id) {
            this.setActivePost(this.props.params.id);
        }
    }

    getPostById(id) {
        this.setActivePost(id);
    }

    toggleFavourite = (id, isFavourite) => {
        this.updatingPost(id, isFavourite);
    }

    deletePost = (id) => {
        this.deletingPost(id).then(() => {
            this.redirectTo('/');
        });
    }

    redirectTo(path) {
        if (path) {
            this.props.router.push(path);
        }
    }

    updatePost = (id) => {
        this.redirectTo(`/post-update/${id}`);
    }

    renderPost(post) {
        if (!_.isEmpty(post)) {
            return <PostProfile post={post} updatePost={this.updatePost} deletePost={this.deletePost} toggleFavourite={this.toggleFavourite} />
        } else if (!post.isFetching && _.isEmpty(post)) {
            return <div className="flex-center">Post with ID: {this.props.params.id} does not exists</div>
        } else {
            return null;
        }

    }

    render() {
        const { activePost } = this.props;

        return (
            <div className="post-profile-container">
                {this.renderPost(activePost)}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        activePost: selectActivePost(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        postsActions: bindActionCreators(postActions, dispatch)
    }
};

PostView = connect(mapStateToProps, mapDispatchToProps)(PostView);

export default PostView;