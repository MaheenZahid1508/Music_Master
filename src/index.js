import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import Login from './Components/Login';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/App' component={App} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
