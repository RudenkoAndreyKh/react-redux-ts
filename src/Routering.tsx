import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './components/Home';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';

export default class Routering extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/registration" component={RegisterPage} />
                </div>
            </Router>
        );
    }
}