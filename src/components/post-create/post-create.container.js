import React, { Component } from 'react';

import './post.create.container.css';

import dbService from '../../services/db.service';
import postsService from '../../services/posts.service';
import LabelSelect from '../../components/label-select/label-select.container';

class NewPost extends Component {
    constructor() {
        super();

        this.state = {
            labels: [],
            activeLabel: null
        };
    }

    componentDidMount() {
        const labels = postsService.getLabels();

        this.setState({
            labels,
            activeLabel: labels[0]
        });
    }

    setActiveItem = (activeLabel) => {
        this.setState({ activeLabel });
    }

    createNewPost = (event) => {
        event.preventDefault();
        const { activeLabel } = this.state;

        const newPost = {
            title: this.title.value,
            label: activeLabel,
            description: this.description.value,
            tags: this.tags.value.trim().split(','),
            code: this.code.value,
        };

        var preparedPost = postsService.prepareNewItem(newPost);
        
        dbService.addPost(preparedPost).then(post => {
            debugger
        })
        .catch(error => {
            debugger
        })
    }

    render() {
        const { labels, activeLabel } = this.state;

        return (
            <div className="new-post-container">
                <h4 className="post-title" >Create new code snippet</h4>
                <form className="form new-post-form" onSubmit={this.createNewPost}>
                    <div className="form-group">
                        <label className="form-label">Title: *</label>
                        <input className="form-input" type="text" ref={(node) => this.title = node} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description: *</label>
                    <input className="form-input" type="text" ref={(node) => this.description = node} />
                    </div>
                    <div className="form-group">
                        <LabelSelect list={labels} activeItem={activeLabel} onSelect={this.setActiveItem} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Tags: *</label>
                        <input className="form-input" type="text" ref={(node) => this.tags = node} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Code: *</label>
                        <textarea className="form-input textarea" type="text" ref={(node) => this.code = node} ></textarea>
                    </div>
                     <div className="btn-group">
                        <button className="btn btn-apply">Create</button>
                        <button className="btn btn-primary">Return to</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewPost;