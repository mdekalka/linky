import React from 'react';
import { PrismCode } from 'react-prism';
import classNames from 'classnames';
import _ from 'lodash';

import './new-post-preview.css';

const PostPreview = ({ title, time, isFavourite, activeLabel, tags, code }) => {

    return (
        <div className="post-preview flex-column">
            <div>
                <h5 className="post-title">{title}</h5>
                <span className="post-favourite"><i className={classNames('fa fa-star', {'active': isFavourite})} aria-hidden="true"></i></span>
            </div>
            <div className="preview-image">
                <img className="image" src={activeLabel.image} alt={activeLabel.name} />
            </div>
            {!!tags.length &&
                <div className="post-tags">
                    [{tags.map((tag, idx) => <span className="post-tag" key={idx}>{tag}</span>)}]
                </div>
            }
            <time className="post-time">{time}</time>
            <PrismCode className="language-javascript">
                {code}
            </PrismCode>
        </div>
    )
};

export default PostPreview;