import React, { useEffect, useState } from 'react';
import { addToDb, getStoredProduct } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    useEffect( ()=>{
        const storedProduct = getStoredProduct()
        const saveCart = [];
        for(const id in storedProduct){
            const addedproducts = products.find(product => product.id === id)
            if(addedproducts){
                const quantity = storedProduct[id];
                addedproducts.quantity = quantity;
                saveCart.push(addedproducts)
            }
        }
        setCart(saveCart)
    },[products])

    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id)
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists]
        }
        setCart(newCart);
        addToDb(selectedProduct.id)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
            {
                products.map(product => <Product
                product= {product}
                key= {product.id}
                handleAddToCart = {handleAddToCart}
                ></Product>)
            }
            </div>
            <div className="order-container">
               <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;