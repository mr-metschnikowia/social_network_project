/*
function createHomepage() {
    let loginHeader = new htmlElement('h2', 'loginHeader', document.body);
    let usernameInput = new htmlElement('input', 'usernameInput', document.body);
    let passwordInput = new htmlElement('input', 'passwordInput', document.body);
    let loginButton = new htmlElement('button', 'loginButton', document.body,"Login");
    let registerButton = new htmlElement('button', 'registerButton', document.body, "Register");
    let elements = [loginHeader, usernameInput, passwordInput, loginButton, registerButton];
    createElements(elements);
}
// function to create homepage

function htmlElement(tag, id, parent, elementClass, innerHTML) {
    this.tag = tag;
    this.id = id;
    this.parent = parent;
    this.class = elementClass;
    this.innerHTML = innerHTML;
}
// htmlElement class constuctor 

function createElements(elements) {
    let newElement;
    for (element of elements) {
        newElement = document.createElement(element.tag);
        if (element.id == 'loginHeader') {
            newElement.innerHTML = "Log-in";
        }
        newElement.id = element.id;
        element.parent.appendChild(newElement);
    }
    return true 
}
// creates html elements based on array of htmlElement class objects
*/

const loginPortal = Vue.createApp({
    data() {
        return { img: 'https://picsum.photos/500/300' }
    },
    methods: {
        changeImage() { this.img = `https://picsum.photos/seed/${Math.random()}/500/300`}
    }
})

loginPortal.mount("#login_portal");