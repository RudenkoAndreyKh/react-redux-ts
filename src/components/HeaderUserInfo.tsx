import React from 'react';
import { connect } from 'react-redux';
import { mainState, homeState } from '../redux/types';

const mapStateToProps = (state: mainState) => ({
  error: state.home.error,
  isLoggedIn: state.home.isLoggedIn,
});


export class UserInfoComponent extends React.Component<homeState> {

  render() {
    const user = this.props.isLoggedIn.user;

    if (!user) return null;
    return (
      <div className="userInfo">
        <img src={user.image || ''} alt="" />
        <h5>Hello {user.firstName}</h5>
      </div>
    )
  }
}




export const UserInfo = connect(mapStateToProps)(UserInfoComponent);
