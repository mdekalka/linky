import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './tools-menu.css';
import Search from '../../components/search/Search';
import LabelSelect from '../../components/label-select/LabelSelect';
import * as filtersActions from '../../actions/filters.actions';
import postsService from '../../services/posts.service';

class ToolsMenu extends Component {
    constructor(props) {
        super(props);

        const filters = props.filtersActions;

        this.resetFilters = filters.resetFilters;
        this.updateFilters = filters.updateFilters;

        this.state = {};
    }

   componentDidMount() {
        const labels = postsService.getLabels();

        this.setState({
            labels,
            actibeLabel: labels[0]
        });

        this.setState({ labels });
    }

    onLabelUpdate = (activeLabel) => {
        this.updateFilters({ activeLabel });        
    }

    render() {
        const { labels } = this.state;
        const { filters } = this.props;

        return (
            <div className="tools-container">
                <div className="form">
                   <Search query={filters.query} onChange={this.updateFilters} ms={300} />
                    <div className="form-group">
                        <label className="form-label">
                            <input type="checkbox" checked={filters.isFavourite} onChange={(event) => this.updateFilters({isFavourite: event.target.checked })} />
                            <span>Favourite post</span>
                        </label>
                    </div>
                    <div className="form-group">
                        <LabelSelect list={labels} onSelect={this.onLabelUpdate} activeItem={filters.activeLabel} />
                    </div>
                    <button onClick={this.resetFilters} className="btn">Reset</button>
                </div>
            </div>
        )
    }
};

ToolsMenu.propTypes = {
    filters: PropTypes.object.isRequired,
    filtersActions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        filtersActions: bindActionCreators(filtersActions, dispatch)
    } 
};

ToolsMenu = connect(mapStateToProps, mapDispatchToProps)(ToolsMenu);

export default ToolsMenu;