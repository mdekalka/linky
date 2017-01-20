import React, { Component } from 'react';
import './post-profile.css';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PrismCode } from 'react-prism';
import classNames from 'classnames';

import Loader from '../loader/loader.component';
import { setActivePost } from '../../actions/posts.actions';
import { updatingPost } from '../../actions/posts.actions';
import { selectActivePost } from '../../reducers/posts.reducer';

let template = `// parent state
.state('app', {
    component: app,
    // ...
    data: {
        requiredAuth: true
    }
})
// child state
.state('new', {
    parent: 'app',
    url: '/new',
    component: 'newPage'
})
.state('contact', {
    parent: 'app',
    url: 'edit',
    component: 'editPage',
}
});
// check authentication on state change event:
$rootScope.$on('$stateChangeStart', function (event, toState) {
    var requiredAuth = toState.data.requiredAuth;
    if (requiredAuth && !authService.isAuthorized()) {
        // redirect to login or try to authenticate
        event.preventDefault();
        $state.go('login');
    }
});
// Note: from the version 1.0.* of ui-rouiter API changes to:
// a state tree where all states which require authentication are children of a parent 'app' state.
$transitions.onStart( { to: 'app.**' }, function(trans) {
    var $state = trans.router.stateService;
    var authService = trans.injector().get('authService');
    // If the user is not authenticated
    if (!authService.isAuthorized()) {
        // Then return a promise for a successful login.
        // The transition will wait for this promise to settle
        return authService.authenticate().catch(function() {
            // If the authenticate() method failed for whatever reason,
            // redirect to a 'login' state which doesn't require auth.
            return $state.target("login");
        });
    }
});`

template = '$transitions.onStart( { to: \'app.**\' }, function(trans) { var $state = trans.router.stateService; The transition will wait for this promise o settle return authService.authenticate().catch(function() {'

class PostProfile extends Component {
    constructor(props) {
        super(props);

        const actions = props.postsActions;

        this.setActivePost = actions.setActivePost;
        this.updatingPost = actions.updatingPost;
    };

    componentDidMount() {
        this.getPostById(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.id !== this.props.params.id) {
            this.setActivePost(nextProps.params.id);
        }
    }

    getPostById(id) {
        this.setActivePost(id);
    }

    toggleFavourite = (id, isFavourite) => {
        this.updatingPost(id, isFavourite);
    }

    renderPost(post) {
        if (!_.isEmpty(post)) {
            const { _id: { $oid: id }, isFetching } = post;
            return (
                <div className="post-profile">
                    <div>
                        <h5 className="post-title">{post.title}</h5>
                        {!isFetching &&
                            <span onClick={() => this.toggleFavourite(id, {isFavourite: !post.isFavourite})} className="post-favourite">
                                <i className={classNames('fa fa-star', {'active': post.isFavourite})} aria-hidden="true"></i>
                            </span>
                        }
                        {isFetching && <Loader size="small" />}
                    </div>
                    <div className="post-tags">
                        [{post.tags.map((tag, idx) => <span className="post-tag" key={idx}>{tag}</span>)}]
                    </div>
                    <div className="post-text post-description">{post.description}</div>
                    <PrismCode className="language-javascript">
                        {post.code}
                    </PrismCode>
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        const { activePost } = this.props;

        return (
            <div className="post-profile-container">
                {this.renderPost(activePost)}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        activePost: selectActivePost(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        postsActions: bindActionCreators({ setActivePost, updatingPost }, dispatch)
    }
};

PostProfile = connect(mapStateToProps, mapDispatchToProps)(PostProfile);

export default PostProfile;