import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import postsService from '../../services/posts.service';


class LinkyContent extends Component {
    constructor() {
        super();

        this.state = {
            posts: []
        };
    }

    getPosts() {
        const posts = postsService.getPosts();
        this.setState({ posts });
    }

    componentDidMount() {
        this.getPosts();
    }

    findPostById(posts, id) {
        // TODO: create a service
        return posts.find(post => post.id === id);
    }

    toggleFavourite = (id) => {
        const { posts } = this.state;

        const activePost = this.findPostById(posts, id);

        if (activePost) {
            activePost.isFavourite = !activePost.isFavourite;
        }

        this.setState({ posts });
    }

    render() {
        const { posts } = this.state;

        return (
            <div className="menu-posts">
                {posts.map(post => {
                    return <LinkyPost post={post} toggleFavourite={this.toggleFavourite} key={post.id} />
                })}
            </div>
        )
    }
}

const LinkyPost = ({ post, toggleFavourite }) => {
    const onToggle = (event, id) => {
        event.preventDefault();
        toggleFavourite(post.id);
    };

    return (
        <Link to={`/post/${post.id}`} >
            <div  className={`main-post ${post.label}`}>
                <div className="post-image"><img className="image" src={post.image} alt={post.title} /></div>
                <div className="post-content">
                    <div>
                        <h5 className="post-title">{post.title}</h5>
                        <span onClick={(event) => onToggle(event, post.id)} className="post-favourite">
                            <i className={classNames('fa fa-star', {'active': post.isFavourite})} aria-hidden="true"></i>
                        </span>
                    </div>
                    <time className="post-time">{post.date}</time>
                    <p className="post-description">{post.description}</p>
                    <div className="post-tags">
                        {post.tags.map((tag, idx) => <span className="post-tag" key={idx}>{tag}&nbsp;</span>)}
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default LinkyContent;