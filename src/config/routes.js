import React from 'react';
import { Router, Route, IndexRoute, applyRouterMiddleware, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import scrollConfig from './scrollConfig';
import store from './configureStore';
import App from '../App';
import LinkyContainer from '../components/linky.container';
import DefaultProfile from '../components/post-default/post-default';
import PostProfile from '../components/post-profile/post-profile.container';
import PostCreator from '../components/post-create/post-create.container';
import About from '../components/about/about';
import NotFound from '../components/not-found/not-found';

const routes = (
    <Provider store={store} >
        <Router history={browserHistory} render={applyRouterMiddleware(scrollConfig)} >
            <Route path="/" component={App} >
                <Route component={LinkyContainer} >
                    <IndexRoute component={DefaultProfile} />
                    <Route path="/post/:id" component={PostProfile} />
                </Route>
                <Route path="/post-create" component={PostCreator} />
                <Route path="/about" component={About} />
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>
);

export default routes;