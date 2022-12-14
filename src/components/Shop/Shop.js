import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addToDb, getStoredProduct } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  // const {products, count} = useLoaderData();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    const url = `http://localhost:5000/products?page=${page}&size=${size}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
      });
  }, [page, size]);

  const pageCount = Math.ceil(count / size);

  useEffect(() => {
    const storedProduct = getStoredProduct();
    const saveCart = [];
    for (const id in storedProduct) {
      const addedproducts = products.find((product) => product._id === id);
      if (addedproducts) {
        const quantity = storedProduct[id];
        addedproducts.quantity = quantity;
        saveCart.push(addedproducts);
      }
    }
    setCart(saveCart);
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find((product) => product._id === selectedProduct._id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    addToDb(selectedProduct._id);
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            product={product}
            key={product._id}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="order-container">
        <Cart cart={cart}>
          <Link to="/orders">
            <button>Review Orders</button>
          </Link>
        </Cart>
      </div>
      <div className="pagination">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={page === number && "selected"}
          >
            {number}
          </button>
        ))}
        <select onChange={(e) => setSize(e.target.value)}>
          <option value="5">5</option>
          <option value="10" selected>
            10
          </option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Shop;
