import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    const {handleAddToCart, product} = props;
    const {name, img, price, seller, ratings} = product;
    return (
        <div className='product'>
            <img src={img} alt="image not found" />
            <div className='product-info'>
                <h4 className='product-name'>{name}</h4>
                <h5 className='price'>Price: {price}</h5>
                <p><small>Manufacturer: {seller}</small></p>
                <p><small>Ratings: {ratings} stars</small></p>
            </div>
            <button onClick={()=> handleAddToCart(product)} className='btn-cart'>
                <p>Add to Cart</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;