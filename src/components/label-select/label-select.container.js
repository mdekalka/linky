import React, { Component } from 'react';
import classNames from 'classnames';

import './label-select.container.css';

class LabelSelect extends Component {
    constructor(props) {
        super(props);

        this.onSelect = props.onSelect;
    }

    render() {
        const { list, activeItem } = this.props;

        return (
            <div className="label-select-container">
                <ul className="label-select-list">
                    {list.map(listItem => {
                        return (
                            <li className={classNames('label-select-item', {'selected': listItem.id === activeItem.id})}
                                onClick={() => this.onSelect(listItem)}
                                key={listItem.id}>
                                <img className="label-select-image" src={listItem.image} alt={listItem.name} />
                            </li>
                        )
                    })}
                </ul>
                {!!list.length && <span className="label-select-active">{activeItem.name}</span>}
            </div>
        )
    }
};

LabelSelect.defaultProps = {
    list: [],
    activeItem: null
};

export default LabelSelect;