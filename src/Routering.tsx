import React from 'react';
import { Router, Route } from "react-router-dom";
import HomePage from './components/Home';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';

interface Props {
    history: any;
  }

export default class Routering extends React.Component <Props> {
    constructor(props: any) {
        super(props);
    }
    history: any = this.props.history;
    render() {
        return (
            <Router history={this.history}>
                <div>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/registration" component={RegisterPage} />
                </div>
            </Router>
        );
    }
}