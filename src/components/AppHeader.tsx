import React from 'react';
import '../css/AppHeader.css';
import { Link } from 'react-router-dom';
import { UserInfo } from './HeaderUserInfo';
import ShoppingCart from './ShoppingCart';

export default class AppHeader extends React.Component {
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  render() {
    return (
      <header className="App-header" >
        <div className="container header">
          <ul className="col-sm-3">
            <li><Link className="link" to="/">Home</Link></li>
            <li><Link className="link" to="/login">Login</Link></li>
            <li><Link className="link" to="/registration">Registration</Link></li>
            <li><Link className="link" to="/login" onClick={() => this.logout()}>Logout</Link></li>
          </ul>
          <UserInfo />
          <ShoppingCart />
        </div>
      </header>
    );
  }
}
