import React from 'react';
import '../css/Authenticate.css';
import { Link, Redirect } from 'react-router-dom';
import { authorize } from '../redux/login/AuthReducer';
import { connect } from 'react-redux';

class LoginPage extends React.Component<any> {

    state = {
        email: '',
        password: '',
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

    signIn = (e: React.FormEvent) => {
        console.log(this.state);
        
        e.preventDefault();
        try {
            const { email, password } = this.state;
            this.props.dispatch(authorize(email, password));
        } catch (err) {
            console.log(err);
        }

    }

    onChange = (e: React.FormEvent) => {
        console.log(this.state);
        this.setState({
            [(e.target as HTMLInputElement).id]: (e.target as HTMLInputElement).value
        })
        
        
    }

    render() {
        return (
            this.state.isUserLoggedIn ?
                <Redirect to="/" push /> :
                <div className="AuthPage">
                    <div className="container">
                        <form onSubmit={e => this.signIn(e)} className="form col-sm-6">
                            <div className="headline">
                                <h5 className="text-monospace">Sign in</h5>
                                <p className="text-monospace">Enter your email and password to login</p>
                            </div>

                            <div className="form-group">
                                <input type="text" id="email" className="form-control" onChange={e => this.onChange(e)} placeholder="enter your email here..." />
                            </div>
                            <div className="form-group">
                                <input type="password" id="password" className="form-control" onChange={e => this.onChange(e)} placeholder="enter your password here..." />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary submitBtn">Login</button>
                            </div>
                            <div className="form-group toRegistration">
                                <Link className="link" to="/registration">Registration</Link>
                            </div>
                        </form>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    token: state.auth.token,
    data: state.auth.data,
    error: state.auth.error
});

export default connect(mapStateToProps)(LoginPage);