//déclaration de la variable "productSaveInLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
let productSaveInLocalStorage = JSON.parse(localStorage.getItem('cart'));
//JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
console.log(productSaveInLocalStorage);

//----------------------------------------L'affichage des produits du panier----------------------------------------
//Séléction de la class où je vais injecter le code HTML
const cart = document.getElementById('cart');
console.log(cart);

//si le panier est vide : afficher le panier est vide
if(productSaveInLocalStorage === null || productSaveInLocalStorage == 0) {
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
            <td><button type="button" class="btn btn-danger btn-delete">X</button></td>
        </tr>
        `;
    }
    if(k === productSaveInLocalStorage.length) {
        //injection HTML dans la page panier
        cart.innerHTML = structureProductCart;
    }
}

//****************************************Fin de l'affichage des produits du panier****************************************

//----------------------------------------Gestion du bouton supprimer l'article----------------------------------------

//Séléction des références de tous les boutons btn-supprimer
let btn_delete = document.querySelectorAll(".btn-delete");
console.log(btn_delete);

for(let l = 0; l < btn_delete.length; l++) {
    btn_delete[l].addEventListener("click", (event) => {
        event.preventDefault(); //pour éviter les comportements par défaut sur les boutons, comme les rechargements de page

        //séléction de l'id du produit qui va être supprimé en cliquant sur le bouton
        let id_selection_delete = productSaveInLocalStorage[l].id;
        console.log("id_selection_delete");
        console.log(id_selection_delete);

        //avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément où le btn supprimer a été cliqué
        productSaveInLocalStorage = productSaveInLocalStorage.filter( el => el.id !== id_selection_delete);
            console.log(productSaveInLocalStorage);
        
        //on envoie la variable dans le localStorage
        //la transformation en format JSON et l'envoyer dans la key "cart" du localStorage
        localStorage.setItem('cart', JSON.stringify(productSaveInLocalStorage));

        //alert pour avertir que le produit a été supprimé et rechargement de la page
        alert("Ce produit a été supprimé du panier.");
        window.location.href = "panier.html";
    })
}
