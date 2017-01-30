import React, { Component } from 'react';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { successAddingPost } from '../../actions/posts.actions';
import { updatingPost } from '../../actions/posts.actions';
import promiseFinally from 'promise.prototype.finally';
import './post.create.container.css';

import dbService from '../../services/db.service';
import postsService from '../../services/posts.service';
import NewPost from './new-post/new-post';
import PostPreview from './post-preview/PostPreview';

// will be a no-op if not needed
promiseFinally.shim();

class PostCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: [],
            isLoading: false,
            postModel: {
                title: '',
                activeLabel: {},
                tags: [],
                isFavourite: false,
                code: ''
            }
        };

        this.updatePost = props.updatePost;
        this.isEditMode = props.route.isEditMode;
    }

    componentDidMount() {
        const labels = postsService.getLabels();
        const postModel = this.state.postModel;
        const { post } = this.props;

        if (post && this.isEditMode) {
            const { title, activeLabel, tags, isFavourite, code } = post;

            this.setState({
                labels,
                postModel: {...postModel, title, activeLabel, tags, isFavourite, code}
            })
        } else {
            this.setState({
                labels,
                postModel: { ...postModel, activeLabel: labels[0] }
            });
        }
    }

    setActiveItem = (activeLabel) => {
        const postModel = this.state.postModel;

        this.setState({
            postModel: { ...postModel, activeLabel }
        });
    }

    createNewPost() {
        const { postModel } = this.state;
        const { addPost } = this.props;
        const preparedPost = postsService.prepareNewItem(postModel);

        this.setState({ isLoading: true });

        promiseFinally(dbService.addPost(preparedPost))
            .then(post => {
                addPost(post);
                this.setState({ isLoading: false });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (this.isEditMode) {
            this.onUpdatePost();
        } else {
            this.createNewPost();
        }
    }

    onUpdatePost() {
        const { postModel } = this.state;
        
        this.updatePost(this.props.params.id, postModel).then(() => {
            // post successfully updated, redirect to main
            this.props.router.push('/');
        });
    }

    updateCode = (rawCode, options) => {
        const postModel = this.state.postModel;

        this.setState({
            postModel: { ...postModel, code: rawCode }
        });
    }

    onTagsUpdate = (tags) => {
        const postModel = this.state.postModel;
        const tagsArray = tags.split(',')

        this.setState({
            postModel: { ...postModel, tags:tagsArray }
        });
    }

    onModelUpdate = (postModel) => {
        this.setState({ postModel });
    }

    render() {
        const { labels, postModel, isLoading } = this.state;
        const now = dateFormat(new Date(), 'mmmm dS, yyyy');

        return (
            <main className="main">
                <div className="post-creator-container">
                    <NewPost 
                        labels={labels}
                        isAdding={isLoading}
                        model={postModel}
                        createNewPost={this.onSubmit}
                        updateCode={this.updateCode}
                        onTagsUpdate={this.onTagsUpdate}
                        onModelUpdate={this.onModelUpdate}
                        setActiveItem={this.setActiveItem}
                        editMode={this.isEditMode} />
                    <PostPreview {...postModel} time={now} />
                </div>
            </main>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    if (ownProps.params.id) {
        return {
            post: state.posts.items.find(post => {
                return post._id.$oid === ownProps.params.id
            })
        }
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: bindActionCreators(successAddingPost, dispatch),
        updatePost: bindActionCreators(updatingPost, dispatch)
    }
};

PostCreator = connect(mapStateToProps, mapDispatchToProps)(PostCreator);

export default PostCreator;