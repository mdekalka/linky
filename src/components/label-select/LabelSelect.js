import React, { Component } from 'react';
import classNames from 'classnames';

import './label-select.css';

class LabelSelect extends Component {
    constructor(props) {
        super(props);

        this.onSelect = props.onSelect;
        this.activeItem = props.activeItem;
    }

    select = (item) => {
        const param = this.activeItem.id === item.id ? {} : item;

        this.onSelect(param);
    }

    render() {
        const { list, activeItem } = this.props;

        return (
            <div className="label-select-container">
                <ul className="label-select-list">
                    {list.map(listItem => {
                        return (
                            <li className={classNames('label-select-item', {'selected': listItem.id === activeItem.id})}
                                onClick={() => this.select(listItem)}
                                key={listItem.id}>
                                <img className="label-select-image" src={listItem.image} alt={listItem.name} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
};

LabelSelect.defaultProps = {
    list: [],
    activeItem: {}
};

export default LabelSelect;