import React, { Component } from 'react';
import dateFormat from 'dateformat';
import './post.create.container.css';

import dbService from '../../services/db.service';
import postsService from '../../services/posts.service';
import NewPost from './new-post/new-post';
import PostPreview from './new-post-preview/new-post-preview';

class PostCreator extends Component {
    constructor() {
        super();

        this.state = {
            labels: [],
            postModel: {
                title: 'My first super javascript post',
                activeLabel: {},
                tags: ['javascript', 'algorithm'],
                code: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
            }
        };
    }

    componentDidMount() {
        const labels = postsService.getLabels();
        const postModel = this.state.postModel;

        this.setState({
            labels,
            postModel: { ...postModel, activeLabel: labels[0] }
        });
    }

    setActiveItem = (activeLabel) => {
        const postModel = this.state.postModel;

        this.setState({
            postModel: { ...postModel, activeLabel }
        });
    }

    createNewPost = (event) => {
        event.preventDefault();
        const { postModel } = this.state;

        const preparedPost = postsService.prepareNewItem(postModel);
        
        dbService.addPost(preparedPost).then(post => {
            debugger
        })
        .catch(error => {
            debugger
        })
    }

    updateCode = (rawCode, options) => {
        const postModel = this.state.postModel;

        this.setState({
            postModel: { ...postModel, code: rawCode }
        });
    }

    onTagsUpdate = (tags) => {
        const postModel = this.state.postModel;

        this.setState({
            postModel: { ...postModel, tags }
        });
    }

    onModelUpdate = (postModel) => {
        this.setState({ postModel });
    }

    render() {
        const { labels, postModel } = this.state;
        const now = dateFormat(new Date(), 'mmmm dS, yyyy');

        return (
            <div className="post-creator-container">
                <NewPost 
                    labels={labels}
                    model={postModel}
                    createNewPost={this.createNewPost}
                    updateCode={this.updateCode}
                    onTagsUpdate={this.onTagsUpdate}
                    onModelUpdate={this.onModelUpdate}
                    setActiveItem={this.setActiveItem} />
                <PostPreview {...postModel} time={now} />
            </div>
        )
    }
}

export default PostCreator;