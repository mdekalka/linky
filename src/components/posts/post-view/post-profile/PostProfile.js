import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { PrismCode } from 'react-prism';

import Loader from '../../../loader/Loader';
import './post-profile.css';

const PostProfile = ({ post, updatePost, deletePost, toggleFavourite }) => {
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
                        <span onClick={() => toggleFavourite(id, {isFavourite: !post.isFavourite})} className="post-favourite">
                            <i className={classNames('fa fa-star', {'active': post.isFavourite})} aria-hidden="true"></i>
                        </span>
                    }
                    {isFetching && <Loader size="small" />}
                </div>
                <div className="post-header-tools">
                    <div className="btn-group">
                        <button onClick={() => updatePost(id)} className="btn btn-action">Edit</button>
                        <button onClick={() => deletePost(id)} className="btn btn-cancel">Delete</button>
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
};

PostProfile.propTypes = {
    post: PropTypes.object.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    toggleFavourite: PropTypes.func.isRequired
};

export default PostProfile