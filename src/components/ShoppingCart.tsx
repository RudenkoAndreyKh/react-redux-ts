import React from 'react';
import { connect } from 'react-redux';
import { mainState, game, cart } from '../redux/types';
import { removeFromCart } from '../redux/home/removeItemFromCartReducer';

const mapStateToProps = (state: mainState) => ({
    cart: state.cart.cart,
    error: ''
});

class ShoppingCart extends React.Component<any> {
    state = {
        isOpened: false
    }



    componentWillReceiveProps(props: any) {
        console.log('componentWillReceiveProps');

    }

    removeGameFromCart(game: game) {
        try {
            this.props.dispatch(removeFromCart(game));
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return <div>
            <button onClick={() => this.setState({ isOpened: !this.state.isOpened })}>Shopping cart</button>
            {this.state.isOpened ? <div className="shoppingCart">
                <ul className="shoppingCartList">
                    {this.props.cart.map((game: game, index: number) => {
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