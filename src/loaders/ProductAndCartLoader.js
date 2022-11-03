import { getStoredProduct } from "../utilities/fakedb";

export const ProductAndCartLoader = async() =>{
    //get products
    const productsData = await fetch ('http://localhost:5000/products')
    const {products} = await productsData.json();
    //get cart
    const savedCart = getStoredProduct();

    const  prevCart = [];
    for( const id in savedCart){
        const addedproduct = products.find(product => product._id === id);
        if(addedproduct){
            const quantity = savedCart[id]
            addedproduct.quantity = quantity
            prevCart.push(addedproduct)
        }
    }
    return { products, prevCart};
}