import React from 'react';
import { Router, Route, IndexRoute , browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './configureStore';

import App from '../App';
import LinkyContainer from '../components/linky.container';
import LinkyContent from '../components/posts/posts.container';
import PostProfile from '../components/post-profile/post-profile.container';
import NewPost from '../components/post-create/post-create.container';

const routes = (
    <Provider store={store} >
        <Router history={browserHistory}>
            <Route path="/" component={App} >
                <Route component={LinkyContainer} >
                    <IndexRoute component={LinkyContent} />
                    <Route path="/post/:id" component={PostProfile} />
                    <Route path="/post-create" component={NewPost} />
                </Route>
            </Route>
        </Router>
    </Provider>
);

export default routes;