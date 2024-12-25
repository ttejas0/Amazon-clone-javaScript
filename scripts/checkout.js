import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentsSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import'../data/cart-class.js';
//import '../data/backend-practice.js';

async function loadPage(){
try{

    // throw 'error1'; 

    await loadProductsFetch();
    await new Promise((resolve, reject) =>{
        // throw 'error2';
        loadCart(() => {
            // reject('error3');
            resolve('value3');
        });
    });

} catch(error){
    console.log('Unexpected error. Please try again later.');
}
    
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) =>{
        loadCart(() => {
            resolve();
        });
    })

]).then(() =>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve('value1'); 
    });

}).then((value) =>{

    console.log(value);
    return new Promise((resolve) =>{
        loadCart(() => {
            resolve();
        });
    });

}).then(() =>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// The reason why we use promise is when we use multiple callbacks it causes lot of nesting. lot of nesting means lots of indents. promises solve this problems by flatening the code.

/*
loadProducts(() =>{
    loadCart(()=>{
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/

