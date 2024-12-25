//👇 Creates a new HTTP message to send to the backend.
const xhr = new XMLHttpRequest();

/* when we want to use the responce from the backend we cannot use it immediately because the response message has
to travel through the internet to reach your computer so we cannot use it immediately. To tackle this problem we use the addEventListener and set it to load. This makes the program wait for the responce before proceeding. we have to setup the event listener before using it thats why we put the event listener at the top.  */
xhr.addEventListener('load', ()=>{
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');
//👇 asynchronous code
xhr.send();
