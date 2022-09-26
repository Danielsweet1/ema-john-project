import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for(const product of cart ){
        quantity = quantity + product.quantity
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping
    }
    let tax = (total * 0.1).toFixed(2)
    tax = parseFloat(tax)
    let grandTotal = total + shipping + tax;
    return (
        <div className='cart'>
             <h3>Order Summary</h3>
             <p><small>Selected items: {quantity}</small></p>
             <p><small>Total: ${total}</small></p>
             <p><small>Shipping: ${shipping}</small></p>
             <p><small>Tax: {tax}</small></p>
             <h4>Grand Total: {grandTotal}</h4>
        </div>
    );
};

export default Cart;