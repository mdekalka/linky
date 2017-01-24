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
                isFavourite: false,
                code: [
                    '# Live demo\n\nChanges are automatically rendered as you type.\n\n* Follows the ',
                    '[CommonMark](http://commonmark.org/) spec\n* Renders actual, "native" React DOM ',
                    'elements\n* Allows you to escape or skip HTML (try toggling the checkboxes above)',
                    '\n* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!\n',
                    '\n## HTML block below\n\n<blockquote>\n    This blockquote will change based ',
                    'on the HTML settings above.\n</blockquote>\n\n## How about some code?\n',
                    '```js\nvar React = require(\'react\');\nvar Markdown = require(\'react-markdown\');',
                    '\n\nReact.render(\n    <Markdown source="# Your markdown here" />,\n    document.',
                    'getElementById(\'content\')\n);\n```\n\nPretty neat, eh?\n\n', '## More info?\n\n',
                    'Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)\n\n',
                    '---------------\n\n',
                    'A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal'
                ].join('')
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
        const tagsArray = tags.split(',')

        this.setState({
            postModel: { ...postModel, tags:tagsArray }
        });
    }

    onModelUpdate = (postModel) => {
        this.setState({ postModel });
    }

    render() {
        const { labels, postModel } = this.state;
        const now = dateFormat(new Date(), 'mmmm dS, yyyy');

        return (
            <main className="main">
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
            </main>
        )
    }
}

export default PostCreator;