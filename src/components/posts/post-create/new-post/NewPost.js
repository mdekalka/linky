import React from 'react';
import CodeMirror from 'react-codemirror';
import { Link } from 'react-router';
import classNames from 'classnames';
import { browserHistory } from 'react-router';
require('codemirror/mode/javascript/javascript');

import Loader from '../../../loader/Loader';
import LabelSelect from '../../../label-select/LabelSelect';
import TagsSelect from '../../../tags-select/TagsSelect';

const NewPost = ({ labels, model, theme, isAdding, setActiveItem, onTagsUpdate, onModelUpdate, updateCode, editMode, onAction }) => {
    return (
        <div className="new-post-container flex-column">
            <form className="form new-post-form" onSubmit={onAction}>
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
                    <CodeMirror value={model.code} onChange={updateCode} options={theme} />
                </div>
                <div className="btn-group">
                    {!editMode && <button disabled={isAdding} type="submit" className="btn btn-apply">Create</button>}
                    {editMode && <button disabled={isAdding} type="submit" className="btn btn-apply">Update</button>}
                    <Link onClick={browserHistory.goBack} className={classNames('btn btn-primary', {'disabled': isAdding})} >Return</Link>
                    {isAdding && <Loader />}
                </div>
            </form>
        </div>
    )
}

export default NewPost;

