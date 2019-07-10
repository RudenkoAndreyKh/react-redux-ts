import React from 'react';
import AppHeader from './AppHeader';
import '../css/StorePage.css';
import HttpRequestService from '../services/HttpRequestService';
import { connect } from 'react-redux';
import { addToCart } from '../redux/home/CartReducer';
import { isLoggedInAct } from '../redux/home/isLoggedInReducer';
import { MainState, Game } from '../redux/types';

const mapStateToProps = (state: MainState) => ({
    user: state.auth.user,
    token: state.auth.token,
    error: state.auth.error,
    isLoggedIn: state.home.isLoggedIn
});

class HomePage extends React.Component<any> {
    httpReq = new HttpRequestService('');

    state = {
        data: [],
        isLoggedIn: false,
    }

    componentWillMount() {
        const token: string | null = localStorage.getItem("token");
        const user: string | null = localStorage.getItem("user");
        this.props.dispatch(isLoggedInAct(JSON.stringify(user), token));
    }

    componentDidMount() {
        this.httpReq.getAllGames()
            .then(res => {
                this.setState({
                    data: res.data.data
                })
            })
    }

    addToCart = (game: Game) => {        
        try {
            this.props.dispatch(addToCart(game));
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        return (
            <div className="HomePage">
                <AppHeader />
                <div className="storeContent container">
                    {this.state.data.map((game: Game, index) => {
                        if(game.quantity === null)game.quantity = 0; 
                        return <div key={index} className="gameCard">
                            <img src={game.image} alt={game.name} />
                            <p className="gameName">{game.name}</p>
                            <p className="gameDesc">{game.description}</p>
                            <p className="gamePrice">Price: {game.price}</p>
                            <button onClick={() => this.addToCart(game)} className="addGameToCartBtn">add to cart</button>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}



export default connect(mapStateToProps)(HomePage)