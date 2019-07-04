import React from 'react';
import '../css/AppHeader.css';
import { Link } from 'react-router-dom';

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className="App-header" >
        <div className="container header">
          <ul className="col-sm-3">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/registration">Registration</Link></li>
          </ul>
        </div>
      </header>
    );
  }
}
