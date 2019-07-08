import React from 'react';
import '../css/Authenticate.css';
import { Link, Redirect } from 'react-router-dom';
import { registration } from '../redux/reducer';
import { connect } from 'react-redux';
import { defaultImage } from '../env';

class RegisterPage extends React.Component<any> {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        image: defaultImage,
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        passwordError: '',
        isUserLoggedIn: false,
    }

    componentWillMount() {
        let user = localStorage.getItem("user");
        if (user) {
            this.setState({
                isUserLoggedIn: true,
            })
        }
        return;
    }

    validateForm = () => {
        let firstNameError = '';
        let lastNameError = '';
        let emailError = '';
        let passwordError = '';

        if (this.state.firstName.length < 6) {
            firstNameError = 'FirstName must be at least 6 symbols';
        }

        if (this.state.lastName.length < 6) {
            lastNameError = 'LastName must be at least 6 symbols';
        }

        if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            emailError = 'Invalid email';
        }

        if (!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)) {
            passwordError = 'Passwor must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
        }

        if (emailError || firstNameError || lastNameError || passwordError) {
            this.setState({
                firstNameError: firstNameError,
                lastNameError: lastNameError,
                emailError: emailError,
                passwordError: passwordError,
            });
            return false;
        }
        return true;
    }

    signUp = (e: any) => {
        e.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const { firstName, lastName, email, password, image } = this.state;
            this.props.dispatch(registration(firstName, lastName, email, password, image));
        }
    }

    onChange = (e: any) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return (
            this.state.isUserLoggedIn ?
                <Redirect to="/" push /> :
                <div className="AuthPage">
                    <div className="container">
                        <form onSubmit={this.signUp} className="form col-sm-6">
                            <div className="headline">
                                <h5 className="text-monospace">Sign Up</h5>
                                <p className="text-monospace">Enter your personal information to sign up</p>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    id="firstName"
                                    className="form-control"
                                    onChange={this.onChange}
                                    placeholder="enter your first name here..." />
                                {this.state.firstNameError ?
                                    (<div className="formError">{this.state.firstNameError}</div>)
                                    : null}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="lastName"
                                    className="form-control"
                                    onChange={this.onChange}
                                    placeholder="enter your last name here..." />
                                {this.state.lastNameError ?
                                    (<div className="formError">{this.state.lastNameError}</div>)
                                    : null}
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    onChange={this.onChange}
                                    placeholder="enter your email here..." />
                                {this.state.emailError ?
                                    (<div className="formError">{this.state.emailError}</div>)
                                    : null}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    onChange={this.onChange}
                                    placeholder="enter your password here..." />
                                {this.state.passwordError ?
                                    (<div className="formError">{this.state.passwordError}</div>)
                                    : null}
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary submitBtn">Sign Up</button>
                            </div>
                            <div className="form-group toLogin">
                                <Link className="link" to="/login">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    token: state.auth.token,
    error: state.auth.error
});

export default connect(mapStateToProps)(RegisterPage)