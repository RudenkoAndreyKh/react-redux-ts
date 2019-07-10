import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { defaultImage } from '../env';
import { MainState } from '../redux/types';
import { isLoggedInAct } from '../redux/home/isLoggedInReducer';
import { changingUser } from '../redux/changeInfo/ChangeReducer';
import AppHeader from './AppHeader';
import FileBase64 from './CompressingImage';

const mapStateToProps = (state: MainState) => ({
    user: state.auth.user,
    token: state.auth.token,
    error: state.auth.error,
    isLoggedIn: state.home.isLoggedIn
});

class UserPage extends React.Component<any> {

    state = {
        _id: '',
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
        file: ''
    }

    componentWillMount() {
        const token: string | null = localStorage.getItem("token");
        const user: string | null = localStorage.getItem("user");
        let userModel;
        if (user) {
            userModel = JSON.parse(user || '');
            this.setState({
                firstName: userModel.firstName,
                lastName: userModel.lastName,
                email: userModel.email,
                _id: userModel._id,
                isUserLoggedIn: true
            })
        }

        this.props.dispatch(isLoggedInAct(JSON.stringify(user), token));
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

    onChange = (e: any) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    changeUserInfo = (e: any) => {
        e.preventDefault();
        if (this.validateForm()) {
            const userModel = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, unhashedPass: this.state.password, image: this.state.image, _id: this.state._id };
            try {
                this.props.dispatch(changingUser(userModel));
            } catch (err) {
                console.log(err);
            }
        }

    }

    getFiles(file: any[]) {
        this.setState({ file: file[0].base64, image: file[0].base64 })
    }

    render() {
        return (
            !this.state.isUserLoggedIn ?
                <Redirect to="/login" push /> :
                <div className="UserPage">
                    <AppHeader />
                    <div className="container">
                        <form onSubmit={this.changeUserInfo} className="form col-sm-6">
                            <div className="headline">
                                <h5 className="text-monospace">Change Info</h5>
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
                                <FileBase64
                                    multiple={true}
                                    onDone={this.getFiles.bind(this)} />
                            </div>

                            <div className="text-center">
                                <img width="100%" src={this.state.file} alt={this.state.file} />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary submitBtn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
        )
    }
}

export default connect(mapStateToProps)(UserPage)