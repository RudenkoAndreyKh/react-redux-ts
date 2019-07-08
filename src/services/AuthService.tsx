import React from 'react';
import axios from 'axios';

export default class AuthService extends React.Component {
    state = {
        domain: 'http://localhost:4000',
    }

    logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
}