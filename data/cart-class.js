//Use PascalCase for things that generate objects
class Cart{
    //👇 public property
    cartItems;
    //👇 Private property
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();

    }
    // 👇 private method
    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

        if (!this.cartItems) {
            this.cartItems = [{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ];
        }

    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                // To check if the product is in the cart
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            // If the product is in the cart, increase the quantity by 1.
            matchingItem.quantity += 1;
        } else {
            // If not in cart, then add to cart
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    }

     // Removing product from the cart
    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;

        this.saveToStorage();
    }

    // Update delivery dates according to the options selected
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                // To check if the product is in the cart
                matchingItem = cartItem;
            }
        });

        // Updating the delivery option to display the exact date
        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }

}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business'); 



console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);