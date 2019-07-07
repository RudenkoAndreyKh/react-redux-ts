import React from 'react';
import axios from 'axios';

export default class HttpRequestService extends React.Component {
    state = {
        domain: 'http://localhost:4000',
    }

    getAllGames() {
        return axios.get(`${this.state.domain}/games`);
    }
}