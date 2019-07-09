import React from 'react';
import AppHeader from './AppHeader';
import '../css/StorePage.css';
import HttpRequestService from '../services/HttpRequestService';
import { connect } from 'react-redux';
import { state } from '../redux/reducer';
import { isLoggedIn } from '../redux/reducer';

const mapStateToProps = (state: any) => ({
    data: state.auth.user,
});

class HomePage extends React.Component<any> {
    httpReq = new HttpRequestService('');

    state = {
        data: []
    }

    componentWillMount() {
        const token:any = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        console.log("home", token);
        this.props.dispatch(isLoggedIn(JSON.stringify(user), token ));
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



export default connect(mapStateToProps)(HomePage)