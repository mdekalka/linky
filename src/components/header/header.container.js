import React, { Component } from 'react';
import classNames from 'classnames';

const LinkySearch = ({ onChange, isOpen, placeholder }) => {
    const searchCls = classNames({
        'search-input': true,
        'show': isOpen
    });

    return (
        <div className="header-search">
            <span onClick={onChange} className="search-icon">
                <i className="fa fa-search" aria-hidden="true"></i>
            </span>
            <form className="header-form">
                <input className={searchCls} placeholder={placeholder} type="text" />
            </form>
        </div>   
    )
};

class LinkyHeader extends Component {
    constructor() {
        super();

        this.state = {
            isSearchOpen: false
        };

    }

    toggleOpen = () => {
        const { isSearchOpen } = this.state;

        this.setState({ isSearchOpen: !isSearchOpen });
    }

    render() {
        const { isSearchOpen } = this.state;

        return (
            <header className="main-header">
                <LinkySearch 
                    onChange={this.toggleOpen}
                    isOpen={isSearchOpen}
                    placeholder="Search post"
                />
            </header>
        )
    }
};

export default LinkyHeader;