import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import { Link } from 'react-router';
require('codemirror/mode/javascript/javascript');

import LabelSelect from '../../../components/label-select/label-select.container';
import TagsSelect from '../../../components/tags-select/tags-select';

class NewPost extends Component {
    constructor(props) {
        super(props);

        this.options = {
            theme: 'monokai',
            mode: 'javascript'
        };
    }

    render() {
        const { labels, model, setActiveItem, onTagsUpdate, onModelUpdate, updateCode, createNewPost } = this.props;

        const options = this.options;

        return (
            <div className="new-post-container flex-column">
                <h4 className="post-title" >Create new code snippet</h4>
                <form className="form new-post-form" onSubmit={createNewPost}>
                    <div className="form-group">
                        <label className="form-label">Title: *</label>
                        <input className="form-input" type="text" value={model.title} onChange={(event) => onModelUpdate({...model, title: event.target.value})} />
                    </div>
                    <div className="form-group">
                        <LabelSelect list={labels} activeItem={model.activeLabel} onSelect={setActiveItem} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Tags: * <span className="form-meta">(comma separated values)</span></label>
                        <TagsSelect onUpdate={onTagsUpdate} value={model.tags} />
                    </div>
                    <div className="form-group">
                        <CodeMirror value={model.code} onChange={updateCode} options={options} />
                    </div>
                     <div className="btn-group">
                        <button className="btn btn-apply">Create</button>
                        <Link to="/" className="btn btn-primary">Return to</Link>
                    </div>
                </form>
            </div>
        )
    }
};

export default NewPost;

