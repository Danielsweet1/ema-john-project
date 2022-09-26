import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    return (
        <div className='cart'>
             <h3>Order Summary</h3>
             <p><small>Selected items: {cart.length}</small></p>
        </div>
    );
};

export default Cart;