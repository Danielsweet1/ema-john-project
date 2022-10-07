import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import './ReviewItem.css'

const ReviewItem = ({product, removeItem}) => {
    const {id, name, img, price, quantity} = product
    return (
        <div className='review-item'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='review-details-container'>
                <div className='review-details'>
                    <p>{name}</p>
                    <p><small>Price: {price}</small></p>
                    <p><small>Quantity: {quantity}</small></p>
                </div>
                <div>
                    <button onClick={() => removeItem(id)} className='trash-btn'>
                        <FontAwesomeIcon className='trash-icon' icon={faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;