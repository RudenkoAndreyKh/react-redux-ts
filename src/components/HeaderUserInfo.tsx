import React from 'react';
import { connect } from 'react-redux';
import { state } from '../redux/reducer';

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.home.isLoggedIn,
});


export class UserInfoComponent extends React.Component<any> {
  componentWillReceiveProps(props:any) {
    
    
  }

  render() {
    const user = this.props.isLoggedIn.user;
    const isLoggedIn = this.props.isLoggedIn.success;
    console.log("islog",this.props);
    
    if(!user) return null;
    return (
      <div className="userInfo">
        <img src={user.image || ''} alt="" />
        <h5>Hello {user.firstName}</h5>
      </div>
    )
  }
}




export const UserInfo = connect(mapStateToProps)(UserInfoComponent);
