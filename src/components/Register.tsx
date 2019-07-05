import React from 'react';
import '../css/Authenticate.css';
import { Link, Redirect, withRouter } from 'react-router-dom';

export default class RegisterPage extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        shouldRedirect: false,
    }

    signUp = (e: any) => {
        e.preventDefault();
        this.setState({ shouldRedirect: true });
    }

    onChange = (e: any) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return (
            <div className="LoginPage">
                <div className="container">
                    {
                        this.state.shouldRedirect ?
                            <Redirect to="/login" push /> :
                            <form onSubmit={this.signUp} className="form col-sm-6">
                                <div className="headline">
                                    <h5 className="text-monospace">Sign Up</h5>
                                    <p className="text-monospace">Enter your personal information to sign up</p>
                                </div>

                                <div className="form-group">
                                    <input type="text" id="firstName" className="form-control" onChange={this.onChange} placeholder="enter your first name here..." />
                                </div>
                                <div className="form-group">
                                    <input type="text" id="lastName" className="form-control" onChange={this.onChange} placeholder="enter your last name here..." />
                                </div>
                                <div className="form-group">
                                    <input type="email" id="email" className="form-control" onChange={this.onChange} placeholder="enter your email here..." />
                                </div>
                                <div className="form-group">
                                    <input type="password" id="password" className="form-control" onChange={this.onChange} placeholder="enter your password here..." />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary submitBtn">Sign Up</button>
                                </div>
                                <div className="form-group toLogin">
                                    <Link to="/login">Login</Link>
                                </div>
                            </form>
                    }
                </div>
            </div>
        )
    }
}