import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import { Link } from 'react-router';
import classNames from 'classnames';
require('codemirror/mode/javascript/javascript');

import Loader from '../../../components/loader/loader.component';
import LabelSelect from '../../../components/label-select/label-select.container';
import TagsSelect from '../../../components/tags-select/tags-select';

class NewPost extends Component {
    constructor(props) {
        super(props);

        this.options = {
            mode: 'javascript',
            theme: 'monokai'
        };
    }

    render() {
        const { labels, model, isAdding, setActiveItem, onTagsUpdate, onModelUpdate, updateCode, createNewPost } = this.props;
        const options = this.options;

        return (
            <div className="new-post-container flex-column">
                <form className="form new-post-form" onSubmit={createNewPost}>
                    <div className="form-group">
                        <label className="form-label">Title: *</label>
                        <input className="form-input" type="text" value={model.title} onChange={(event) => onModelUpdate({...model, title: event.target.value})} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            <input type="checkbox" checked={model.isFavourite} onChange={(event) => onModelUpdate({ ...model, isFavourite: event.target.checked  })} />
                            <span>Favourite post</span>
                        </label>
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
                        <button disabled={isAdding} className="btn btn-apply">Create</button>
                        <Link to="/" className={classNames('btn btn-primary', {'disabled': isAdding})} >Return to</Link>
                        {isAdding && <Loader />}
                    </div>
                </form>
            </div>
        )
    }
};

export default NewPost;

