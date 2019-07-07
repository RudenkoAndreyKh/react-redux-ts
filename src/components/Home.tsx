import React from 'react';
import AppHeader from './AppHeader';
import '../css/StorePage.css';
import HttpRequestService from '../services/HttpRequestService';

export default class HomePage extends React.Component {
    httpReq = new HttpRequestService('');

    state = {
        data: []
    }

    componentDidMount() {
        this.httpReq.getAllGames()
            .then(res => {
                this.setState({
                    data: res.data.data
                })
            })
    }
    render() {
        return (
            <div className="HomePage">
                <AppHeader />
                <div className="storeContent container">
                    {this.state.data.map((game: any, index) => {
                        return <div key={index} className="gameCard">
                            <img src={game.image} alt={game.name} />
                            <p className="gameName">{game.name}</p>
                            <p className="gameDesc">{game.description}</p>
                            <p className="gamePrice">Price: {game.price}</p>
                            <button className="addGameToCartBtn">add to cart</button>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}