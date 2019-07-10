import React from 'react';
import { connect } from 'react-redux';
import { MainState, HomeState } from '../redux/types';
import { Link } from 'react-router-dom';

const mapStateToProps = (state: MainState) => ({
  error: state.home.error,
  isLoggedIn: state.home.isLoggedIn,
});


export class UserInfoComponent extends React.Component<HomeState> {

  render() {
    const user = this.props.isLoggedIn.user;

    if (!user) return null;
    return (
      <div className="userInfo">
        <Link className="link" to="/user-page"><img src={user.image || ''} alt="" /></Link>
        <h5>Hello {user.firstName}</h5>
      </div>
    )
  }
}




export const UserInfo = connect(mapStateToProps)(UserInfoComponent);
