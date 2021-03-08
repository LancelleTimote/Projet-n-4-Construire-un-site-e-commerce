//déclaration de la variable "productSaveInLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
let productSaveInLocalStorage = JSON.parse(localStorage.getItem('cart'));
//JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
console.log(productSaveInLocalStorage);

//----------------------------------------L'affichage des produits du panier----------------------------------------
//Séléction de la class où je vais injecter le code HTML
const cart = document.getElementById('cart');
console.log(cart);

//si le panier est vide : afficher le panier est vide
if(productSaveInLocalStorage === null) {
    const emptyCart = `
        <td colspan="6" class="text-center">Le panier est vide.</td>
    `;
    cart.innerHTML = emptyCart;
}
//si le panier n'est pas vide : afficher les produits dans le localStorage
else{
    let structureProductCart = [];

    for(k = 0; k < productSaveInLocalStorage.length; k++) {
        structureProductCart = structureProductCart + `
        <tr class="text-center">
            <th scope ="row" class="pictureCart"><img src='${productSaveInLocalStorage[k].picture}' alt="Photo ours en peluche" class="w-50 d-block mx-auto border border-success"></th>
            <td>${productSaveInLocalStorage[k].name}</td>
            <td>${productSaveInLocalStorage[k].color}</td>
            <td>${productSaveInLocalStorage[k].price}</td>
            <td>${productSaveInLocalStorage[k].quantity}</td>
            <td></td>
        </tr>
        `;
    }
    if(k === productSaveInLocalStorage.length) {
        //injection HTML dans la page panier
        cart.innerHTML = structureProductCart;
    }
}

// console.log(localStorage.getItem("cart"));

// function affichagePanier () {
//       let cartItems = localStorage.getItem('cart');
//       cartItems = JSON.parse(cartItems);
//       let productsInCart = document.getElementById('cart');
//       if (cartItems && productsInCart) {
//             productsInCart.innerHTML = '';
//             Object.values(cartItems).map(item => {    //Object.values renvoie un tableau contenant les valeurs des propriétés d'un objet dont l'ordre est le même que celui obtenu avec une boucle
//                   productsInCart.innerHTML = '<tr>'   //La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
//                   +'<th scope="row"><img src='' alt="Photo ours en peluche" class="d-block mx-auto border border-success shadow"></th>'
//                   +'<td></td>'
//                   +'<td></td>'
//                   +'<td></td>'
//                   +'</tr>'
//             })
//       }
// }