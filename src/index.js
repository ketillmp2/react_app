import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from "./store";
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import Main from "./components/Main";

export const history = createHistory();

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}/>
            <Route path="/" component={Main}/>
            <Route path="/login" component={Login}/>
        </Router>
    </Provider>
), document.getElementById('root'));
