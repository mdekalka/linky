import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import Loader from '../../components/loader/loader.component';
import * as postsActions from '../../actions/posts.actions';
import dbService from '../../services/db.service';

class LinkyContent extends Component {
    constructor(props) {
        super(props);

        const actions = props.postsActions;

        this.loadPosts = actions.loadPosts;
        this.toggleFavourite = actions.toggleFavourite;
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

    onFavouriteToggle = (id, isFavourite) => {
        debugger
        this.toggleFavourite(id, isFavourite);
    }

    render() {
        const { posts, isFetching } = this.props;

        return (
            <ul className="menu-posts">
                {isFetching && <Loader>Loading posts...</Loader>}
                {!isFetching && posts.map(post => {
                    return <LinkyPost post={post} toggleFavourite={this.onFavouriteToggle} key={post._id.$oid} />
                })}
            </ul>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts.items,
        isFetching: state.posts.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        postsActions: bindActionCreators(postsActions, dispatch)
    }
};

LinkyContent = connect(mapStateToProps, mapDispatchToProps)(LinkyContent);

const LinkyPost = ({ post, toggleFavourite }) => {
    const onToggle = (event, id, isFavourite) => {
        event.preventDefault();
        toggleFavourite(id, { isFavourite: !isFavourite });
    };

    const { $oid: id } = post._id;

    return (
        <li>
            <Link className="main-post-route" to={`/post/${id}`} activeClassName="active">
                <div className={`main-post ${post.label}`}>
                    <div className="post-image"><img className="image" src={post.image} alt={post.title} /></div>
                    <div className="post-content">
                        <div>
                            <h5 className="post-title">{post.title}</h5>
                            <span onClick={(event) => onToggle(event, id, post.isFavourite)} className="post-favourite">
                                <i className={classNames('fa fa-star', {'active': post.isFavourite})} aria-hidden="true"></i>
                            </span>
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