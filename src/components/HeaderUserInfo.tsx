import React from 'react';
import { connect } from 'react-redux';
import { state } from '../redux/reducer';

const mapStateToProps = (state: any) => ({
    isLoggedIn: state.home.isLoggedIn,
});


export class UserInfoComponent extends React.Component<any> {
    render() {
        let user = state.auth.user;
        let isLoggedIn = state.home.isLoggedIn;
        console.log(state.home.isLoggedIn);
        
      return (
        <div className="userInfo">
             <h1>xxxxx{isLoggedIn.toString()}</h1>
            <img src={user && (user.image || '')} alt="" />
            <h5>Hello {user && user.firstName}</h5>
        </div>
    )
    }
  }




export const UserInfo = connect(mapStateToProps)(UserInfoComponent);
