import React, { Component } from 'react';
import './post-profile.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PrismCode } from 'react-prism';
import classNames from 'classnames';

import Loader from '../loader/loader.component';
import * as postActions from '../../actions/posts.actions';
import { selectActivePost } from '../../reducers/posts.reducer';

class PostProfile extends Component {
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

    }

    renderPost(post) {
        if (!_.isEmpty(post)) {
            const { _id: { $oid: id }, isFetching } = post;

            return (
                <div className="post-profile">
                    <div className="post-header">
                        <div className="post-header-info">
                            <div className="post-image">
                                <img className="image" src={post.activeLabel.image} alt={post.activeLabel.name} />
                            </div>
                            <h5 className="post-title">{post.title}</h5>
                            {!isFetching &&
                                <span onClick={() => this.toggleFavourite(id, {isFavourite: !post.isFavourite})} className="post-favourite">
                                    <i className={classNames('fa fa-star', {'active': post.isFavourite})} aria-hidden="true"></i>
                                </span>
                            }
                            {isFetching && <Loader size="small" />}
                        </div>
                        <div className="post-header-tools">
                            <div className="btn-group">
                                <button onClick={() => this.updatePost(id)} className="btn btn-action">Edit</button>
                                <button onClick={() => this.deletePost(id)} className="btn btn-cancel">Delete</button>
                            </div>
                        </div>
                    </div>
                    {!!post.tags.length &&
                        <div className="post-tags">
                            [{post.tags.map((tag, idx) => <span className="post-tag" key={idx}>{tag}</span>)}]
                        </div>
                    }
                    
                    <PrismCode className="language-javascript">{post.code}</PrismCode>
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        const { activePost, params } = this.props;

        return (
            <div className="post-profile-container">
                {this.renderPost(activePost)}
                {(!activePost.isFetching && _.isEmpty(activePost)) &&
                    <div className="flex-center">Post with ID: {params.id} does not exists</div>
                }
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

PostProfile = connect(mapStateToProps, mapDispatchToProps)(PostProfile);

export default PostProfile;