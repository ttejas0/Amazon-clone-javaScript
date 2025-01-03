import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js'; 
import { renderPaymentSummary } from './paymentsSummary.js';

export function renderOrderSummary(){

    let cartSummaryHTML = '';

    cart.forEach((cartItem) =>{
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );

        //👇 Generating html.
        cartSummaryHTML +=`
            <div class="cart-item-container 
            js-cart-item-container
            js-cart-item-container-${matchingProduct.id}">
                    <div class="delivery-date">
                    Delivery date: ${dateString}
                    </div>

                    <div class="cart-item-details-grid">
                    <img class="product-image"
                        src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                        ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                        ${matchingProduct.getPrice()}
                        </div>
                        <div class="product-quantity
                        js-product-quantity-${matchingProduct.id}">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link
                        js-delete-link-${matchingProduct.id}"
                        data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                        Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                    </div>
                </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem){

        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            //calculating delivery dates
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            );
            const dateString = deliveryDate.format(
                'dddd, MMMM D'
            );
            const priceString = deliveryOption.priceCents === 0
            ? 'FREE'
            : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html+=`
            <div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio"
                            ${isChecked ? 'checked' : ''}
                            class="delivery-option-input"
                            name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                            ${dateString}
                            </div>
                            <div class="delivery-option-price">
                            ${priceString}  Shipping
                            </div>
                        </div>
                        </div>
            `
        });
        return html;
    }


// Update the order summary section in the DOM with the generated cart summary HTML
document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

// Add click event listeners to all delete links in the cart
document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            // Retrieve the product ID from the delete link's data attribute
            const productId = link.dataset.productId;

            // Call a function to remove the product from the cart
            removeFromCart(productId);

            // Find the container for this specific cart item and remove it from the DOM
            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            container.remove();

            // Recalculate and update the payment summary after removing the item
            renderPaymentSummary();
        });
    });

// Add click event listeners to all delivery option radio buttons
document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
        element.addEventListener('click', () => {
            // Retrieve the product ID and delivery option ID from the radio button's data attributes
            const { productId, deliveryOptionId } = element.dataset;

            // Call a function to update the delivery option for the specified product
            updateDeliveryOption(productId, deliveryOptionId);

            // Recalculate and update the order summary to reflect the new delivery option
            renderOrderSummary();

            // Recalculate and update the payment summary to include the new delivery cost
            renderPaymentSummary();
        });
    });

}
