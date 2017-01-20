import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import Loader from '../../components/loader/loader.component';
import ErrorMessage from '../../components/error/error.component';
import * as postsActions from '../../actions/posts.actions';
import dbService from '../../services/db.service';

class LinkyContent extends Component {
    constructor(props) {
        super(props);

        const actions = props.postsActions;

        this.loadPosts = actions.loadPosts;
        this.updatingPost = actions.updatingPost;
    }

    getPosts() {
        this.loadPosts().then(() => {
            // TODO: fires after success items received
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getPosts();
    }

    toggleFavourite = (id, isFavourite) => {
        this.updatingPost(id, isFavourite);
    }

    render() {
        const { posts, isFetching, errorMessage } = this.props;

        return (
            <div className="menu-posts">
                {isFetching && <div className="flex-center"><Loader>Loading posts...</Loader></div>}
                {!isFetching && 
                    <ul className="menu-list">
                        {posts.map(post => {
                            return <LinkyPost post={post} toggleFavourite={this.toggleFavourite} key={post._id.$oid} />
                        })}
                    </ul>
                }
                {(errorMessage && !isFetching) && <div className="flex-center"><ErrorMessage title="Posts loading failed. Please, reload the page." message={errorMessage} /></div>}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts.items,
        isFetching: state.posts.isFetching,
        errorMessage: state.posts.errorMessage

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        postsActions: bindActionCreators(postsActions, dispatch)
    }
};

LinkyContent = connect(mapStateToProps, mapDispatchToProps)(LinkyContent);

const LinkyPost = ({ post, toggleFavourite }) => {
    const onToggle = (id, isFavourite) => {
        toggleFavourite(id, { isFavourite: !isFavourite });
    };

    let { _id: { $oid: id }, isFetching } = post;

    return (
        <li>
            <Link className="main-post-route" to={`/post/${id}`} activeClassName="active">
                <div className={`main-post ${post.label}`}>
                    <div className="post-image"><img className="image" src={post.image} alt={post.title} /></div>
                    <div className="post-content">
                        <div>
                            <h5 className="post-title">{post.title}</h5>
                            {/* Note: How to avoid this conditional statement for better readability?
                                TODO: Find a better solution for this boilerplate conditions */}
                            {!isFetching &&
                                <span onClick={(event) => onToggle(id, post.isFavourite)} className="post-favourite">
                                    <i className={classNames('fa fa-star', {'active': post.isFavourite})} aria-hidden="true"></i>
                                </span>
                            }
                            {isFetching && <Loader size="small" />}
                        </div>
                        <time className="post-time">{post.date}</time>
                        <p className="post-description">{post.description}</p>
                        <div className="post-tags">
                            [{post.tags.map((tag, idx) => <span className="post-tag" key={idx}>{tag}</span>)}]
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
};

export default LinkyContent;