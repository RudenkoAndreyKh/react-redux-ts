import React from 'react';
import { connect } from 'react-redux';
import { MainState, Game, Cart } from '../redux/types';
import { removeFromCart, removeAllItems } from '../redux/home/CartReducer';

const mapStateToProps = (state: MainState) => ({
    cart: state.cart.cart,
    error: '',
});

class ShoppingCart extends React.Component<any> {
    state = {
        isOpened: false
    }

    removeGameFromCart(game: Game) {
        try {
            this.props.dispatch(removeFromCart(game));
        } catch (err) {
            console.log(err);
        }
    }

    removeAllItems(){
        try {
            this.props.dispatch(removeAllItems());
            localStorage.removeItem("cart")
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return <div>
            <button onClick={() => this.setState({ isOpened: !this.state.isOpened })}>Shopping cart</button>
            {this.state.isOpened ? <div className="shoppingCart">
            <button onClick={() => this.removeAllItems()}>REMOVE ALL ITEMS</button>
                <ul className="shoppingCartList">
                    {this.props.cart.map((game: Game, index: number) => {
                        return <li key={index}>
                            {game.name}, price: {game.price * game.quantity} <button onClick={() => this.removeGameFromCart(game)}>-</button>
                        </li>
                    })}
                </ul>
            </div> : null}
        </div>
    }
}

export default connect(mapStateToProps)(ShoppingCart)