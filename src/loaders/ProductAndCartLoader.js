import { getStoredProduct } from "../utilities/fakedb";

export const ProductAndCartLoader = async() =>{
    //get products
    const productsData = await fetch ('products.json')
    const products = await productsData.json();
    //get cart
    const savedCart = getStoredProduct();

    const  prevCart = [];
    for( const id in savedCart){
        const addedproduct = products.find(product => product.id === id);
        if(addedproduct){
            const quantity = savedCart[id]
            addedproduct.quantity = quantity
            prevCart.push(addedproduct)
        }
    }
    return { products, prevCart};
}