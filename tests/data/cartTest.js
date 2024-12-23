import {addToCart, cart, loadFromStorage} from '../../data/cart.js'

describe('test suit: addToCart', () => {
 it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
        // we don't want to save this to the local storage because this is a test code. so we mock the localStorage.setItem
        spyOn(localStorage, 'setItem');
        //Local storage only supports strings
        return JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart.length).toEqual(1);
  //to check wether localStorage was called
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart[0].quantity).toEqual(2);
 });

 it('adds a new product to the cart', () =>{
    // we don't want to save this to the local storage because this is a test code. so we mock the localStorage.setItem
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
        //Local storage only supports strings
        return JSON.stringify([]);
    });
    loadFromStorage();


  addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart.length).toEqual(1);
  //to check wether localStorage was called
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart[0].quantity).toEqual(1);
 });
});