import React from 'react';

const Cart = ({cart}) => {
    return (
        <div>
             <h3>Order Summary</h3>
             <p><small>Selected items: {cart.length}</small></p>
        </div>
    );
};

export default Cart;