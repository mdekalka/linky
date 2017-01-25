import React, { Component } from 'react';
import './tools.css';
import menuIcon from '../../assets/icons/hamburger.svg';
import ReactSVG from 'react-svg';
import classNames from 'classnames';

import LabelSelect from '../../components/label-select/label-select.container';

class Tools extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true
        };

        this.onUpdateFilters = props.onUpdateFilters;
    }

    toggleOpen = () => {
        const { isOpen } = this.state;

        this.setState({ isOpen: !isOpen });
    }

    onLabelUpdate = (activeLabel) => {
        this.onUpdateFilters({ activeLabel });        
    }

    render() {
        const { isOpen } = this.state;
        const { labels, resetModel, filters } = this.props;

        return (
            <div className={classNames('tools-container', {'show': isOpen})}>
                <div className="tools-header">
                    <div onClick={this.toggleOpen}><ReactSVG path={menuIcon} className="tools-icon" /></div>
                </div>
                <div className="tools-content">
                    <div className="form">
                        <div className="form-group">
                            <label className="form-label">
                                <input type="checkbox" checked={filters.isFavourite} onChange={(event) => this.onUpdateFilters({isFavourite: event.target.checked })} />
                                <span>Favourite post</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <LabelSelect list={labels} onSelect={this.onLabelUpdate} activeItem={filters.activeLabel} />
                        </div>
                        <button onClick={resetModel} className="btn">Reset</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tools;