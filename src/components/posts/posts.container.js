import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dateFormat from 'dateformat';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';
import { selectPostsByFilters } from '../../reducers/posts.reducer';

import Search from '../../components/search/search';
import Tools from '../../components/tools/tools';
import Loader from '../../components/loader/loader.component';
import ErrorMessage from '../../components/error/error.component';
import * as postsActions from '../../actions/posts.actions';
import * as filtersActions from '../../actions/filters.actions';
import postsService from '../../services/posts.service';

class LinkyContent extends Component {
    constructor(props) {
        super(props);

        const posts = props.postsActions;
        const filters = props.filtersActions;

        this.loadPosts = posts.loadPosts;
        this.updatingPost = posts.updatingPost;

        this.resetFilters = filters.resetFilters;
        this.updateFilters = filters.updateFilters;

        this.state = {};
    }

    getPosts = () => {
        const { isFetching } = this.props;

        if (isFetching) {
            return;
        }

        this.loadPosts().then(() => {
            // Note: fires after success items received
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        const labels = postsService.getLabels();

        this.setState({ labels });

        this.getPosts();
    }

    toggleFavourite = (id, isFavourite) => {
        this.updatingPost(id, isFavourite);
    }

    onUpdateFilters = (filters) => {
        this.updateFilters(filters);
    }

    resetModel = () => {
        this.resetFilters();
    }

    render() {
        const { posts, isFetching, isFirstLoad, hasMoreItems, errorMessage, filters } = this.props;
        const { labels } = this.state;

        return (
            <div className="posts-nav-menu">
                <Search 
                    onUpdateFilters={this.onUpdateFilters}
                    throttle={300} />
                <Tools 
                    labels={labels}
                    onUpdateFilters={this.onUpdateFilters}
                    resetModel={this.resetModel}
                    filters={filters} />
                {(isFetching && isFirstLoad) && <div className="flex-center"><Loader>Loading posts...</Loader></div>}
                <InfiniteScroll
                    className="flex"
                    pageStart={0}
                    loadMore={this.getPosts}
                    initialLoad={false}
                    hasMore={hasMoreItems}
                    loader={!isFirstLoad && <Loader />}
                    useWindow={false}>
                    <ul className="menu-list">
                        {posts.map(post => {
                            return <LinkyPost post={post} toggleFavourite={this.toggleFavourite} key={post._id.$oid} />
                        })}
                    </ul>
                </InfiniteScroll>
                {(errorMessage && !isFetching) &&
                    <div className="flex-center">
                        <ErrorMessage title="Posts loading failed. Please, reload the page." message={errorMessage} />
                    </div>
                }
                {(!isFetching && !posts.length) && <div className="flex-center">No items available</div>}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        posts: selectPostsByFilters(state),
        isFetching: state.posts.isFetching,
        isFirstLoad: state.posts.isFirstLoad,
        errorMessage: state.posts.errorMessage,
        hasMoreItems: state.posts.hasMoreItems
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        postsActions: bindActionCreators(postsActions, dispatch),
        filtersActions: bindActionCreators(filtersActions, dispatch)
    }
};

LinkyContent = connect(mapStateToProps, mapDispatchToProps)(LinkyContent);

const LinkyPost = ({ post, toggleFavourite }) => {
    const onToggle = (event, id, isFavourite) => {
        event.preventDefault();
        toggleFavourite(id, { isFavourite: !isFavourite });
    };

    let { _id: { $oid: id }, isFetching } = post;

    return (
        <li>
            <Link className="main-post-route" to={`/post/${id}`} activeClassName="active">
                <div className={`main-post ${post.activeLabel.name}`}>
                    <div className="post-image"><img className="image" src={post.activeLabel.image} alt={post.title} /></div>
                    <div className="post-content">
                        <div>
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

export default LinkyContent;