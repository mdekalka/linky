import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ToolsMenu from '../../tools/ToolsMenu';
import PostsList from '../posts-list/PostsList';
import * as postsActions from '../../../actions/posts.actions';
import * as filtersActions from '../../../actions/filters.actions';
import postsService from '../../../services/posts.service';
import { selectPostsByFilters } from '../../../reducers/posts.reducer';

class PostsView extends Component {
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
        const { posts, isFetching, isFirstLoad, hasMoreItems, errorMessage } = this.props;

        return (
            <div className="posts-nav-menu one-half column">
                <ToolsMenu />
                <PostsList
                    getPosts={this.getPosts}
                    toggleFavourite={this.toggleFavourite}
                    posts={posts}
                    isFetching={isFetching}
                    isFirstLoad={isFirstLoad}
                    hasMoreItems={hasMoreItems}
                    errorMessage={errorMessage} />
            </div>
        )
    }
};

PostsView.propTypes = {
    filters: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isFirstLoad: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    hasMoreItems: PropTypes.bool.isRequired
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

PostsView = connect(mapStateToProps, mapDispatchToProps)(PostsView);

export default PostsView;