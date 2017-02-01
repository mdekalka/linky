import React, { PropTypes } from 'react';

const TagsSelect = ({ value, onUpdate }) => {
    const update = (event) => {
        const value = event.target.value.trim();

        onUpdate(value);
    };

    return (
        <div className="tags-select-container">
            <input type="text" className="form-input" onChange={update} value={value} />
        </div>
    )
};

TagsSelect.propTypes = {
    value: PropTypes.array,
    onUpdate: PropTypes.func.isRequired
};

export default TagsSelect;