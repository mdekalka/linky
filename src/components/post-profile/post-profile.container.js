import React, { Component } from 'react';
import './post-profile.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PrismCode } from 'react-prism';
import classNames from 'classnames';
// import ReactMarkdown from 'react-markdown';

import Loader from '../loader/loader.component';
import { setActivePost } from '../../actions/posts.actions';
import { updatingPost } from '../../actions/posts.actions';
import { selectActivePost } from '../../reducers/posts.reducer';

class PostProfile extends Component {
    constructor(props) {
        super(props);

        const actions = props.postsActions;

        this.setActivePost = actions.setActivePost;
        this.updatingPost = actions.updatingPost;
    };

    componentDidMount() {
        this.getPostById(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.id !== this.props.params.id) {
            this.setActivePost(nextProps.params.id);
        }
    }

    getPostById(id) {
        this.setActivePost(id);
    }

    toggleFavourite = (id, isFavourite) => {
        this.updatingPost(id, isFavourite);
    }

    renderPost(post) {
        if (!_.isEmpty(post)) {
            const { _id: { $oid: id }, isFetching } = post;

            return (
                <div className="post-profile">
                    <div>
                        <h5 className="post-title">{post.title}</h5>
                        {!isFetching &&
                            <span onClick={() => this.toggleFavourite(id, {isFavourite: !post.isFavourite})} className="post-favourite">
                                <i className={classNames('fa fa-star', {'active': post.isFavourite})} aria-hidden="true"></i>
                            </span>
                        }
                        {isFetching && <Loader size="small" />}
                    </div>
                    {!!post.tags.length &&
                        <div className="post-tags">
                            [{post.tags.map((tag, idx) => <span className="post-tag" key={idx}>{tag}</span>)}]
                        </div>
                    }
                    <PrismCode className="language-javascript">
                        {post.code}
                    </PrismCode>
                </div>
            )
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
        postsActions: bindActionCreators({ setActivePost, updatingPost }, dispatch)
    }
};

PostProfile = connect(mapStateToProps, mapDispatchToProps)(PostProfile);

export default PostProfile;