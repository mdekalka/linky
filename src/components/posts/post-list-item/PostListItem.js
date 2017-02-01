import React, { PropTypes } from 'react';
import classNames from 'classnames';
import dateFormat from 'dateformat';
import { Link } from 'react-router';

import Loader from '../../loader/Loader';

const PostListItem = ({ post, toggleFavourite }) => {
    const { _id: { $oid: id }, isFetching } = post;
    const onToggle = (event, id, isFavourite) => {
        event.preventDefault();
        toggleFavourite(id, { isFavourite: !isFavourite });
    };

    return (
        <li className="main-post-link">
            <Link className="main-post-route" to={`/post/${id}`} activeClassName="active">
                <div className={`main-post ${post.activeLabel.name}`}>
                    <div className="post-image"><img className="image" src={post.activeLabel.image} alt={post.title} /></div>
                    <div className="post-content">
                        <div className="post-body">
                            <h5 className="post-title">{post.title}</h5>
                            {/* Note: How to avoid this conditional statement for better readability?
                                TODO: Find a better solution for this boilerplate conditions */}
                            {!isFetching &&
                                <span onClick={(event) => onToggle(event, id, post.isFavourite)} className="post-favourite">
                                    <i className={classNames('fa fa-star', {'active': post.isFavourite})} aria-hidden="true"></i>
                                </span>
                            }
                            {isFetching && <Loader size="small" />}
                        </div>
                        <div className="post-tags">
                            [{post.tags.map((tag, idx) => <span className="post-tag" key={idx}>{tag}</span>)}]
                        </div>
                        <time className="post-time">{dateFormat(post.date, 'mmmm dS, yyyy')}</time>
                    </div>
                </div>
            </Link>
        </li>
    )
};

PostListItem.propTypes = {
    post: PropTypes.object.isRequired,
    toggleFavourite: PropTypes.func.isRequired
};

export default PostListItem;