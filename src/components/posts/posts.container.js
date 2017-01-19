import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import * as postsActions from '../../actions/posts.actions';

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

    toggleFavourite = (id) => {
        this.toggleFavourite(id);
    }

    render() {
        const { posts } = this.props;

        return (
            <div className="menu-posts">
            <div className="leaf-loader"></div>
                {posts.map(post => {
                    return <LinkyPost post={post} toggleFavourite={this.toggleFavourite} key={post._id.$oid} />
                })}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts.items
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        postsActions: bindActionCreators(postsActions, dispatch)
    }
};

LinkyContent = connect(mapStateToProps, mapDispatchToProps)(LinkyContent);

const LinkyPost = ({ post, toggleFavourite }) => {
    const onToggle = (event, id) => {
        event.preventDefault();
        toggleFavourite(id);
    };

    const { $oid: id } = post._id;

    return (
        <Link className="main-post-route" to={`/post/${id}`} activeClassName="active">
            <div  className={`main-post ${post.label}`}>
                <div className="post-image"><img className="image" src={post.image} alt={post.title} /></div>
                <div className="post-content">
                    <div>
                        <h5 className="post-title">{post.title}</h5>
                        <span onClick={(event) => onToggle(event, id)} className="post-favourite">
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
    )
};

export default LinkyContent;