import React, { PropTypes } from 'react';
import { PrismCode } from 'react-prism';
import classNames from 'classnames';

import './post-preview.css';

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
            {!!code.length &&
                <PrismCode className="code-preview language-javascript">
                {code}
                </PrismCode>
            }
        </div>
    )
};

PostPreview.propTypes = {
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    activeLabel: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    code: PropTypes.string.isRequired
};

export default PostPreview;