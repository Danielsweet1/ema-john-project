import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Order = () => {
  const { products, prevCart } = useLoaderData();
  const [cart, setCart] = useState(prevCart);

  const removeItem = (id) => {
    const remaining = cart.filter((product) => product.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };
  return (
    <div>
      <div className="shop-container">
        <div className="orders-container">
          {cart.map((product) => (
            <ReviewItem
              key={product.id}
              product={product}
              removeItem={removeItem}
            ></ReviewItem>
          ))}
        </div>
        <div className="order-container">
          <Cart cart={cart}>
            <Link to="/shipping">
              <button>Proceed Shipping</button>
            </Link>
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Order;
