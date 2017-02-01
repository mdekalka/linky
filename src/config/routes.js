import React from 'react';
import { Router, Route, IndexRoute, applyRouterMiddleware, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import scrollConfig from './scrollConfig';
import store from './configureStore';
import App from '../App';
import MainContent from '../components/MainContent';
import PostDefault from '../components/posts/post-default/PostDefault';
import PostView from '../components/posts/post-view/PostView';
import PostCreator from '../components/posts/post-create/PostCreator';
import About from '../components/about/About';
import NotFound from '../components/not-found/NotFound';
import Additional from '../components/additional/Additional';
import AdditionalLinks from '../components/additional/additional-links/AdditionalLinks';
import ReduxSaga from '../components/additional/redux-saga/ReduxSaga';
import Normalizr from '../components/additional/normalizr/Normalizr';

const routes = (
    <Provider store={store} >
        <Router history={browserHistory} render={applyRouterMiddleware(scrollConfig)} >
            <Route path="/" component={App} >
                <Route component={MainContent} >
                    <IndexRoute component={PostDefault} />
                    <Route path="/post/:id" component={PostView} />
                </Route>
                <Route path="/post-create" component={PostCreator} />
                <Route path="/post-update/:id" isEditMode={true} component={PostCreator} />
                <Route path="/about" component={About} />
                <Route path="/additional" component={Additional} >
                    <IndexRoute component={AdditionalLinks} />
                    <Route path="/additional/redux-saga" component={ReduxSaga} />
                    <Route path="/additional/normalizr" component={Normalizr} />
                </Route>
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>
);

export default routes;