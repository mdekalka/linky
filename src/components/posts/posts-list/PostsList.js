import React, { PropTypes } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Loader from '../../loader/Loader';
import ErrorMessage from '../../error/Error';
import PostListItem from '../post-list-item/PostListItem';

const PostsList = ({ posts, getPosts, toggleFavourite, isFetching, isFirstLoad, errorMessage, hasMoreItems }) => {
    return (
        <div className="posts-list">
            {(isFetching && isFirstLoad) && <div className="flex-center"><Loader>Loading posts...</Loader></div>}
            {!errorMessage && 
            <div className="menu-list-scroll">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={getPosts}
                    initialLoad={true}
                    hasMore={hasMoreItems}
                    loader={!isFirstLoad && <div className="flex-center"><Loader /></div>}
                    useWindow={false}>
                    <ul className="menu-list">
                        {posts.map((post) => <PostListItem post={post} toggleFavourite={toggleFavourite} key={post._id.$oid} />)}
                    </ul>
                </InfiniteScroll>
            </div>
            }
            {(errorMessage && !isFetching) &&
                <div className="flex-center">
                    <ErrorMessage title="Posts loading failed. Please, reload the page." message={errorMessage} />
                </div>
            }
            {(!isFetching && !posts.length) && <div className="flex-center">No items available</div>}
        </div>
    )
};

PostsList.propTypes = {
    posts: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
    toggleFavourite: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isFirstLoad: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    hasMoreItems: PropTypes.bool.isRequired
};

export default PostsList;

