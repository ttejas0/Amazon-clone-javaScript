export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
},
{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
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
