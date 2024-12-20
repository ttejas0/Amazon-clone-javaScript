export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
},
{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem) =>{
        if(productId === cartItem.productId){
            //To check if the product is in the cart
            matchingItem = cartItem;
        }
    });

    if(matchingItem){
        // if the product is in the cart increase the quantity by 1.
        matchingItem.quantity += 1;
    } else{ // if not in cart then add to cart
        cart.push({
            productId: productId,
            quantity: 1
        });
    }
}

//removing product from the cart
export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;
}