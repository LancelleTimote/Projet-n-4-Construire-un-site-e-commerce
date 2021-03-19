//Déclaration de la variable "productSaveInLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
let productSaveInLocalStorage = JSON.parse(localStorage.getItem('cart'));
//JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
console.log(productSaveInLocalStorage);

//----------------------------------------L'affichage des produits du panier----------------------------------------
//Séléction de la class où je vais injecter le code HTML
const cart = document.getElementById('cart');
console.log(cart);

//Si le panier est vide : afficher le panier est vide
if(productSaveInLocalStorage === null || productSaveInLocalStorage == 0) {
    const emptyCart = `
        <tr class="text-center">
        <th colspan="6">Le panier est vide.</th>
        </tr>
    `;
    cart.innerHTML = emptyCart;
}
//Si le panier n'est pas vide : afficher les produits dans le localStorage
else{
    let structureProductCart = [];

    for(k = 0; k < productSaveInLocalStorage.length; k++) {
        structureProductCart = structureProductCart + `
        <tr class="text-center">
            <th scope ="row" class="pictureCart"><img src='${productSaveInLocalStorage[k].picture}' alt="Photo ours en peluche" class="w-50 d-block mx-auto border border-success"></th>
            <td>${productSaveInLocalStorage[k].name}</td>
            <td>${productSaveInLocalStorage[k].color}</td>
            <td>${productSaveInLocalStorage[k].price} €</td>
            <td>${productSaveInLocalStorage[k].quantity}</td>
            <td><button type="button" class="btn btn-danger btn-delete">X</button></td>
        </tr>
        `;
    }
    if(k === productSaveInLocalStorage.length) {
        //Injection HTML dans la page panier
        cart.innerHTML = structureProductCart;
    }
}

//****************************************Fin de l'affichage des produits du panier****************************************

//----------------------------------------Gestion du bouton supprimer l'article----------------------------------------

//Séléction des références de tous les boutons btn-supprimer
let btnDelete = document.querySelectorAll(".btn-delete");
console.log(btnDelete);

for(let l = 0; l < btnDelete.length; l++) {
    btnDelete[l].addEventListener("click", (event) => {
        event.preventDefault(); //Pour éviter les comportements par défaut sur les boutons, comme les rechargements de page

        //Séléction de l'id du produit qui va être supprimé en cliquant sur le bouton
        let idSelectionDelete = productSaveInLocalStorage[l].id;
        console.log("idSelectionDelete");
        console.log(idSelectionDelete);

        //Avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément où le btn supprimer a été cliqué
        productSaveInLocalStorage = productSaveInLocalStorage.filter( el => el.id !== idSelectionDelete);
            console.log(productSaveInLocalStorage);
        
        //On envoie la variable dans le localStorage
        //La transformation en format JSON et l'envoyer dans la key "cart" du localStorage
        localStorage.setItem('cart', JSON.stringify(productSaveInLocalStorage));

        //alert pour avertir que le produit a été supprimé et rechargement de la page
        alert("Ce produit a été supprimé du panier.");

        //Rechargement de la page
        window.location.href = "panier.html";
    })
}

//****************************************Fin de la gestion du bouton supprimer l'article****************************************

//----------------------------------------Bouton pour vider entièrement le panier----------------------------------------
//Code HTML du bouton à afficher dans la page
const btnHtmlDeleteAllProduct = `
<tr class="text-center">
    <th colspan="6"><button type="button" class="btn btn-danger btn-delete-all-product">Vider le panier</button></th>
</tr>
`;
console.log(btnHtmlDeleteAllProduct);

//Insertion du bouton dans le HTML du panier
cart.insertAdjacentHTML("beforeend", btnHtmlDeleteAllProduct);

//Sélection de la référence du bouton "btn-delete-all-product"
const btnDeleteAllProduct = document.querySelector(".btn-delete-all-product");
console.log(btnDeleteAllProduct);

//Suppression de la key "cart" du localStorage pour vider entièrement le panier
btnDeleteAllProduct.addEventListener('click', (e) => {
    e.preventDefault(); //Pour éviter les comportements par défaut sur les boutons, comme les rechargements de page

    //.removeItem pour vider le localStorage
    localStorage.removeItem("cart");

    //alert "Le panier a été vidé."
    alert("Le panier a été vidé.")

    //Rechargement de la page
    window.location.href = "panier.html";
});

//****************************************Fin du bouton pour vider entièrement le panier****************************************

//----------------------------------------Montant total du panier----------------------------------------
//Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
let totalPriceCalcul = [];

//Aller chercher les prix dans le panier
for (let m = 0; m < productSaveInLocalStorage.length; m++) {
    let priceProductInCart = productSaveInLocalStorage[m].price;

    //Mettre les prix du panier dans la variable "totalPriceCalcul"
    totalPriceCalcul.push(priceProductInCart)

    console.log(totalPriceCalcul);
}

//Additionner les prix qu'il y a dans le tableau de la variable prixTotalCalcul avec la méthode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceCalcul.reduce(reducer,0);
console.log(totalPrice);

//Code HTML du prix total à afficher
const displayTotalPriceHtml = `
<tr class="text-center">
    <th colspan="6">Le montant total du panier est de : ${totalPrice} €</th>
</tr>
`;

//Injection html dans la page panier après le dernier enfant
cart.insertAdjacentHTML("beforeend", displayTotalPriceHtml);

//****************************************Fin du montant total panier****************************************

//----------------------------------------Formulaire de commande----------------------------------------

const displayFormHtml = () => {
    //Séléction élément du DOM pour le positionnement du formulaire
    const formPosition = document.querySelector(".table");
    const formStructure = `
    <form class="bg-light">
        <h2 class="text-center title-form mb-4">Informations nécessaires pour valider la commande</h2>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="lastname">Nom :</label>
                <input name="lastname" type="text" id="lastname" class="form-control" minlength="2" maxlength="30" placeholder="Dupont">
            </div>
            <div class="form-group col-md-6">
                <label for="name">Prénom :</label>
                <input name="name" type="text" id="name" class="form-control" minlength="2" maxlength="30" placeholder="John">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col">
                <label for="address">Adresse :</label>
                <input name="address" type="text" id="address" class="form-control" placeholder="14 rue des fleurs">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col">
                <label for="address2">Compléments d'adresse :</label>
                <input name="address2" type="text" id="address2" class="form-control" placeholder="Numéro bâtiment, appartement, etc...">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="city">Ville :</label>
                <input name="city" type="text" id="city" class="form-control" placeholder="Paris">
            </div>
            <div class="form-group col-md-6">
                <label for="zipCode">Code postal :</label>
                <input name="zipCode" type="number" id="zipCode" class="form-control" placeholder="75680">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col">
                <label for="country">Pays :</label>
                <input name="country" type="text" id="country" class="form-control" placeholder="France">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="email">Mail :</label>
                <input name="email" type="text" id="email" class="form-control" placeholder="oriteddy@orinoco.com" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$">
            </div>
            <div class="form-group col-md-6">
                <label for="phone">Téléphone :</label>
                <input name="phone" type="tel" id="phone" class="form-control" placeholder="07 53 85 12 39">
            </div>
        </div>
        <div class="text-center">
            <button type="reset" class="btn btn-danger">Réinitialiser le formulaire</button>
            <button type="submit" id="sendForm" class="btn btn-success">Commander</button>
        </div>
    </form>
    `;

    //Injection HTML
    formPosition.insertAdjacentHTML("afterend", formStructure);
};

//Affichage du formulaire
displayFormHtml();

//Séléction du bouton envoyer le formulaire
const btnSendForm = document.querySelector("#sendForm");

//----------AddEventListener----------
btnSendForm.addEventListener("click", (e) => {
    e.preventDefault();

    //Création / définition d'une classe pour fabriquer l'objet dans lequel iront les values du formulaire
    //Les values du formulaire
    class Form {
        constructor() {
            this.lastname = document.querySelector("#lastname").value;
            this.name = document.querySelector("#name").value;
            this.address = document.querySelector("#address").value;
            this.address2 = document.querySelector("#address2").value;
            this.city = document.querySelector("#city").value;
            this.zipCode = document.querySelector("#zipCode").value;
            this.country = document.querySelector("#country").value;
            this.email = document.querySelector("#email").value;
            this.phone = document.querySelector("#phone").value;
        }
    }

    //Appel de l'instance de class "Form" pour créer l'objet formValues
    const formValues = new Form();
    console.log("formValues");
    console.log(formValues);

    //Récupération des valeurs du formulaire (demander au mentor plutôt class ou ça)
    // const formValues = {
    //     lastname : document.querySelector("#lastname").value,
    //     name : document.querySelector("#name").value,
    //     address : document.querySelector("#address").value,
    //     address2 : document.querySelector("#address2").value,
    //     city : document.querySelector("#city").value,
    //     zipCode : document.querySelector("#zipCode").value,
    //     country : document.querySelector("#country").value,
    //     email : document.querySelector("#email").value,
    //     phone : document.querySelector("#phone").value
    // }

    //Mettre l'objet "formValues" dans le localStorage
    localStorage.setItem("formValues", JSON.stringify(formValues));
    
    //Mettre les values du formulaire et les produits sélectionnés dans un objet à envoyer au serveur
    const toSendServer = {
        productSaveInLocalStorage,
        formValues,
    }
    console.log("toSendServer");
    console.log(toSendServer);
    
    //Envoie de l'objet "toSendServer" au serveur
})

//**********Fin addEventListener**********

//----------Mettre le contenu du localStorage dans les champs du formulaire pour que ça reste----------

//Prendre la key dans le localStorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem("formValues");

//Convertir la chaîne de caractère en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//Mettre les values du localSotrage dans les champs du formulaire
document.querySelector("#lastname").value = dataLocalStorageObjet.lastname;
document.querySelector("#name").value = dataLocalStorageObjet.name;
document.querySelector("#address").value = dataLocalStorageObjet.address;
document.querySelector("#address2").value = dataLocalStorageObjet.address2;
document.querySelector("#city").value = dataLocalStorageObjet.city;
document.querySelector("#zipCode").value = dataLocalStorageObjet.zipCode;
document.querySelector("#country").value = dataLocalStorageObjet.country;
document.querySelector("#email").value = dataLocalStorageObjet.email;
document.querySelector("#phone").value = dataLocalStorageObjet.phone;

console.log("dataLocalStorageObjet");
console.log(dataLocalStorageObjet);

//****************************************Fin du formulaire de commande****************************************





/* <tr class="text-center">
<th scope ="row" class="pictureCart"><img src='${productSaveInLocalStorage[k].picture}' alt="Photo ours en peluche" class="w-50 d-block mx-auto border border-success"></th>
<td>${productSaveInLocalStorage[k].name}</td>
<td>${productSaveInLocalStorage[k].color}</td>
<td>${productSaveInLocalStorage[k].price} €</td>
<td>${productSaveInLocalStorage[k].quantity}</td>
<td>${productSaveInLocalStorage[k].id}</td>
<td><button type="button" class="btn btn-danger btn-delete">X</button></td>
</tr> */

// //séléction des références de tous les boutons btn-supprimer
// let btnDelete = document.getElementsByClassName("btn-delete");
// console.log(btnDelete);
// console.log(btnDelete[0]);

// for(let l = 0; l < btnDelete.length; l++) {
//     console.log(btnDelete[l].parentNode.parentNode);
//     btnDelete[l].addEventListener("click", function(event) {
//         console.log("id a supprimer :");
//         console.log();
//         console.log("couleur a supprimer :");

//         event.preventDefault(); //pour éviter les comportements par défaut sur les boutons, comme les rechargements de page

//         let newProductSaveInLocalStorage = [];
//         console.log("on parcours le tableau du panier stocké en localStorage :");
//         for(let n = 0; n < productSaveInLocalStorage.length; n++) {
//             console.log("ligne " + n + " :");
//             console.log(productSaveInLocalStorage[n]);
//             //si pas même id que les autres
//             //if (productSaveInLocalStorage[n].id !== event.target.id) 
//         }
        
//         //on envoie la variable dans le localStorage
//         //la transformation en format JSON et l'envoyer dans la key "cart" du localStorage
//         localStorage.setItem('cart', JSON.stringify(productSaveInLocalStorage));

//         //alert pour avertir que le produit a été supprimé et rechargement de la page
//         alert("Ce produit a été supprimé du panier.");

//         //rechargement de la page
//         window.location.href = "panier.html";
//     });
// };