import React from 'react';
import '../css/Authenticate.css';
import { Link, Redirect } from 'react-router-dom';

export default class LoginPage extends React.Component {

    state = {
        email: '',
        password: '',
        shouldRedirect: false,
    }

    signIn = (e: any) => {
        e.preventDefault();
        this.setState({ shouldRedirect: true });
    }

    handleChange = (e: any) => {
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
                            <Redirect to="/" push /> :
                            <form onSubmit={this.signIn} className="form col-sm-6">
                                <div className="headline">
                                    <h5 className="text-monospace">Sign in</h5>
                                    <p className="text-monospace">Enter your email and password to login</p>
                                </div>

                                <div className="form-group">
                                    <input type="email" id="email" className="form-control" onChange={this.handleChange} placeholder="enter your email here..." />
                                </div>
                                <div className="form-group">
                                    <input type="password" id="password" className="form-control" onChange={this.handleChange} placeholder="enter your password here..." />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary submitBtn">Login</button>
                                </div>
                                <div className="form-group toRegistration">
                                    <Link to="/registration">Registration</Link>
                                </div>
                            </form>
                    }

                </div>
            </div>
        )
    }
}