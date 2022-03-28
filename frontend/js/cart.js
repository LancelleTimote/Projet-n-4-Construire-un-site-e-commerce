//Déclaration de la variable "productSaveInLocalStorage" dans laquelle on met la key "cart" et ses values qui sont dans le local storage
let productSaveInLocalStorage = JSON.parse(localStorage.getItem('cart'));
//JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
console.log(productSaveInLocalStorage);

//----------------------------------------L'affichage des produits du panier----------------------------------------

function displayProductInCart () {
    //Séléction de l'élément où je vais injecter le code HTML
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
            structureProductCart += '<tr class="text-center">';
            structureProductCart += '<th scope ="row" class="id d-none">'+productSaveInLocalStorage[k].id+'</th>';
            structureProductCart += '<td class="pictureCart"><img src="'+productSaveInLocalStorage[k].picture+'" alt="Photo ours en peluche" class="w-50 d-block mx-auto border border-success"></td>';
            structureProductCart += '<td>'+productSaveInLocalStorage[k].name+'</td>';
            structureProductCart += '<td class="color">'+productSaveInLocalStorage[k].color+'</td>';
            structureProductCart += '<td>'+productSaveInLocalStorage[k].price*productSaveInLocalStorage[k].quantity+' €</td>';
            structureProductCart += '<td><button type="button" class="btn btn-danger btn-decrease">-</button> '+productSaveInLocalStorage[k].quantity+' <button type="button" class="btn btn-success btn-increase">+</button></td>';
            structureProductCart += '<td><button type="button" class="btn btn-danger btn-delete">X</button></td>';
            structureProductCart += '</tr>';
        }
        if(k === productSaveInLocalStorage.length) {
            //Injection HTML dans la page panier
            cart.innerHTML = structureProductCart;
        }
    }
}

displayProductInCart();

//****************************************Fin de l'affichage des produits du panier****************************************





//----------------------------------------Gestion du bouton augmenter et diminuer les quantités d'un article dans le panier----------------------------------------

//--------------------Création d'un bouton pour augmenter la quantité d'un produit dans le panier--------------------

function increaseButtons() {
    const increaseButtons = document.querySelectorAll(".btn-increase");
    let idProduct;
    let colorProduct;
    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', function(event) {
            event.preventDefault();
            //récupération de l'id de la ligne cliqué
            idProduct = increaseButtons[i].parentElement.parentElement.childNodes[0].innerText.trim();

             //récupération de la couleur de la ligne cliqué
            colorProduct = increaseButtons[i].parentElement.parentElement.childNodes[3].innerText.trim();

            for (let product in productSaveInLocalStorage) {
                //si couleur et id du produit cliqué pareil que celui dans localstorage
                if(idProduct === productSaveInLocalStorage[product].id && colorProduct === productSaveInLocalStorage[product].color) {
                    productSaveInLocalStorage[product].quantity++;
                    localStorage.setItem('cart', JSON.stringify(productSaveInLocalStorage));
                    location.reload();
                }
            }
        })
    }
}

increaseButtons();

//********************Fin création d'un bouton pour augmenter la quantité d'un produit dans le panier********************

//--------------------Création d'un bouton pour diminuer la quantité d'un produit dans le panier--------------------

function decreaseButtons() {
    const decreaseButtons = document.querySelectorAll(".btn-decrease");
    let idProduct;
    let colorProduct;
    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', function(event) {
            event.preventDefault();
            //récupération de l'id de la ligne cliqué
            idProduct = decreaseButtons[i].parentElement.parentElement.childNodes[0].innerText.trim();

            //récupération de la couleur de la ligne cliqué
            colorProduct = decreaseButtons[i].parentElement.parentElement.childNodes[3].innerText.trim();

            for (let product in productSaveInLocalStorage) {
                //si couleur et id du produit cliqué pareil que celui dans localstorage, et quantité dans localstorage = 1
                if(idProduct === productSaveInLocalStorage[product].id && colorProduct === productSaveInLocalStorage[product].color && productSaveInLocalStorage[product].quantity === 1) {
                    alert(`L'ours en peluche "${productSaveInLocalStorage[product].name}" avec la couleur "${productSaveInLocalStorage[product].color}" a bien été supprimé du panier.`);
                    //on supprime l'élément du tableau
                    productSaveInLocalStorage.splice([product], 1);
                    localStorage.setItem('cart', JSON.stringify(productSaveInLocalStorage));
                    location.reload();

                    //si plus de produit dans la localstorage, on le clear
                    if(productSaveInLocalStorage.length === 0) {
                        localStorage.clear();
                        location.reload();
                    }
                }
                else if(idProduct === productSaveInLocalStorage[product].id && colorProduct === productSaveInLocalStorage[product].color) {
                    productSaveInLocalStorage[product].quantity--;
                    localStorage.setItem('cart', JSON.stringify(productSaveInLocalStorage));
                    location.reload();
                }
            }
        })
    }
}

decreaseButtons();

//********************Fin création d'un bouton pour diminuer la quantité d'un produit dans le panier********************

//****************************************Fin de la gestion du bouton augmenter et diminuer les quantités d'un article dans le panier****************************************





//----------------------------------------Gestion du bouton supprimer un article dans le panier----------------------------------------

function deleteButtons() {
    const deleteButtons = document.querySelectorAll(".btn-delete");
    let idProduct;
    let colorProduct;
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function(event) {
            event.preventDefault();

            //récupération de l'id de la ligne cliqué
            idProduct = deleteButtons[i].parentElement.parentElement.childNodes[0].innerText.trim();

            //récupération de la couleur de la ligne cliqué
            colorProduct = deleteButtons[i].parentElement.parentElement.childNodes[3].innerText.trim();

            for (let product in productSaveInLocalStorage) {
                //si couleur et id du produit cliqué pareil que celui dans localstorage
                if(idProduct === productSaveInLocalStorage[product].id && colorProduct === productSaveInLocalStorage[product].color) {
                    alert(`L'ours en peluche "${productSaveInLocalStorage[product].name}" avec la couleur "${productSaveInLocalStorage[product].color}" a bien été supprimé du panier.`);
                    //on supprime l'élément du tableau
                    productSaveInLocalStorage.splice([product], 1);
                    localStorage.setItem('cart', JSON.stringify(productSaveInLocalStorage));
                    location.reload();
                    
                    //si plus de produit dans la localstorage, on le clear
                    if(productSaveInLocalStorage.length === 0) {
                        localStorage.clear();
                        location.reload();
                    }
                }
            }
        })
    }
}

deleteButtons();

//****************************************Fin de la gestion du bouton supprimer l'article****************************************





//----------------------------------------Bouton pour vider entièrement le panier----------------------------------------

function clearCart() {
    //Code HTML du bouton à afficher dans la page
    const btnHtmlDeleteAllProduct = `
    <tr class="text-center">
        <th colspan="6"><button type="button" class="btn btn-danger btn-delete-all-product">Vider le panier</button></th>
    </tr>
    `;

    //Insertion du bouton dans le HTML du panier
    cart.insertAdjacentHTML("beforeend", btnHtmlDeleteAllProduct);

    //Sélection de la référence du bouton "btn-delete-all-product"
    const btnDeleteAllProduct = document.querySelector(".btn-delete-all-product");
    console.log(btnDeleteAllProduct);

    //Suppression de la key "cart" du localStorage pour vider entièrement le panier
    btnDeleteAllProduct.addEventListener('click', function(event) {
        event.preventDefault(); //Pour éviter les comportements par défaut sur les boutons, comme les rechargements de page

        //.removeItem pour vider le localStorage
        localStorage.removeItem("cart");

        //alert "Le panier a été vidé."
        alert("Le panier a été vidé.")

        //Rechargement de la page
        location.reload();
    });
}

clearCart();

//****************************************Fin du bouton pour vider entièrement le panier****************************************





//----------------------------------------Montant total du panier----------------------------------------

function totalOrderAmount() {
    //Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
    let totalPriceCalcul = [];

    //Aller chercher les prix dans le panier
    for (let m = 0; m < productSaveInLocalStorage.length; m++) {
        let priceProductInCart = productSaveInLocalStorage[m].price*productSaveInLocalStorage[m].quantity;

        //Mettre les prix du panier dans la variable "totalPriceCalcul"
        totalPriceCalcul.push(priceProductInCart);

        console.log(totalPriceCalcul);
    }

    //Additionner les prix qu'il y a dans le tableau de la variable prixTotalCalcul avec la méthode .reduce
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = totalPriceCalcul.reduce(reducer,0);
    console.log(totalPrice);

    //Code HTML du prix total à afficher
    const displayTotalPriceHtml = `
    <tr class="text-center">
        <th colspan="6">Le montant total du panier est de : <span id="totalOrderAmountId">${totalPrice} €</span></th>
    </tr>
    `;

    //Injection html dans la page panier après le dernier enfant
    cart.insertAdjacentHTML("beforeend", displayTotalPriceHtml);
}

totalOrderAmount();

//****************************************Fin du montant total panier****************************************





//----------------------------------------Formulaire de commande----------------------------------------

function displayFormHtml() {
    //Séléction élément du DOM pour le positionnement du formulaire
    const formPosition = document.querySelector(".table");
    const formStructure = `
    <form class="bg-light">
        <h2 class="text-center title-form mb-4">Informations nécessaires pour valider la commande</h2>
        <div class="form-row">
            <div class="form-group col-lg-6">
                <label for="lastname">Nom :</label>
                <input name="lastname" type="text" id="lastname" class="form-control" minlength="2" maxlength="30" placeholder="exemple : Dupont">
                <div class="invalid-feedback text-danger" id="textIncorrectLastName"></div>
            </div>
            <div class="form-group col-lg-6">
                <label for="firstname">Prénom :</label>
                <input name="firstname" type="text" id="firstname" class="form-control" minlength="2" maxlength="30" placeholder="exemple : John">
                <div class="invalid-feedback text-danger" id="textIncorrectFirstName"></div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col">
                <label for="address">Adresse :</label>
                <input name="address" type="text" id="address" class="form-control" placeholder="exemple : 14 rue des fleurs">
                <div class="invalid-feedback text-danger" id="textIncorrectAddress"></div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-lg-6">
                <label for="city">Ville :</label>
                <input name="city" type="text" id="city" class="form-control" placeholder="exemple : Paris">
                <div class="invalid-feedback text-danger" id="textIncorrectCity"></div>
            </div>
            <div class="form-group col-lg-6">
                <label for="email">Mail :</label>
                <input name="email" type="text" id="email" class="form-control" placeholder="exemple : oriteddy@oriteddy.com">
                <div class="invalid-feedback text-danger" id="textIncorrectEmail"></div>
            </div>
        </div>
        <div class="text-center row">
            <button type="reset" class="btn btn-danger col-lg-4 mx-lg-auto my-md-3 mt-lg-4">Réinitialiser le formulaire</button>
            <button type="submit" id="sendForm" class="btn btn-success col-lg-4 mx-lg-auto mb-lg-3 mt-lg-4">Commander</button>
        </div>
    </form>
    `;

    //Injection HTML
    formPosition.insertAdjacentHTML("afterend", formStructure);
};

//Affichage du formulaire
displayFormHtml();

//****************************************Fin du formulaire de commande****************************************





//----------------------------------------Gestion du bouton commander----------------------------------------

function orderButton() {
    //Séléction du bouton envoyer le formulaire
    const btnSendForm = document.querySelector("#sendForm");

    //----------------------------------------AddEventListener pour commander----------------------------------------
    btnSendForm.addEventListener("click", function(event) {
        event.preventDefault();

        //Création / définition d'une classe pour fabriquer l'objet dans lequel iront les values du formulaire
        //Les values du formulaire
        class Form {
            constructor() {
                this.lastname = document.querySelector("#lastname").value;
                this.firstname = document.querySelector("#firstname").value;
                this.address = document.querySelector("#address").value;
                this.city = document.querySelector("#city").value;
                this.email = document.querySelector("#email").value;
            }
        }

        //Appel de l'instance de class "Form" pour créer l'objet formValues
        const formValues = new Form();

        //--------------------Gestion validation du formulaire--------------------

        //Contrôle de la validité du nom
        function lastNameControl() {
            const theLastName = formValues.lastname;
            if(regExLastnameFirstnameCity(theLastName)) {
                colorCorrectFormField("lastname");
                textCorrectFormField("textIncorrectLastName");
                return true;
            }else{
                colorIncorrectFormField("lastname");
                textIncorrectFormField("textIncorrectLastName");
                alert(textAlert("Nom incorrect"));
                return false;
            }
        }

        //Contrôle de la validité du prénom
        function firstNameControl() {
            const theFirstName = formValues.firstname;
            if(regExLastnameFirstnameCity(theFirstName)) {
                colorCorrectFormField("firstname");
                textCorrectFormField("textIncorrectFirstName");
                return true;
            }else{
                colorIncorrectFormField("firstname");
                textIncorrectFormField("textIncorrectFirstName");
                alert(textAlert("Prénom incorrect"));
                return false;
            }
        }

        //Contrôle de la validité de l'adresse
        function addressControl() {
            const theAddress = formValues.address;
            if(/^[0-9]{1,5}[A-z0-9 'à-ÿ-]{5,40}$/.test(theAddress)) {
                colorCorrectFormField("address");
                textCorrectFormField("textIncorrectAddress");
                return true;
            }else{
                colorIncorrectFormField("address");
                textIncorrectFormField("textIncorrectAddress");
                alert(textAlert("Addresse incorrect"));
                return false;
            }
        }

        //Contrôle de la validité de la ville
        function cityControl() {
            const theCity = formValues.city;
            if(regExLastnameFirstnameCity(theCity)) {
                colorCorrectFormField("city");
                textCorrectFormField("textIncorrectCity");
                return true;
            }else{
                colorIncorrectFormField("city");
                textIncorrectFormField("textIncorrectCity");
                alert(textAlert("Ville incorrect"));
                return false;
            }
        }

        //Contrôle de la validité de l'email
        function emailControl() {
            const theEmail = formValues.email;
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(theEmail)) {
                colorCorrectFormField("email");
                textCorrectFormField("textIncorrectEmail");
                return true;
            }else{
                colorIncorrectFormField("email");
                textIncorrectFormField("textIncorrectEmail");
                alert(textAlert("Email incorrect"));
                return false;
            }
        }

        //Contrôle validité formulaire avant envoie dans le localStorage
        if(lastNameControl() && firstNameControl() && addressControl() && cityControl() && emailControl()) {
            //Mettre l'objet "formValues" dans le localStorage
            localStorage.setItem("formValues", JSON.stringify(formValues));
            //Récupération des values du formulaire, des produits sélectionnés, et du total du panier pour envoyer au serveur
            sendForm();
        }else{
            alert("Veuillez remplir correctement le formulaire.");
        }

        //********************Fin gestion validation formulaire********************
    })

    //****************************************Fin AddEventListener pour commander****************************************
}

orderButton();

//****************************************Fin gestion du bouton commander****************************************





//----------------------------------------Fonctions gestion des validations formulaire----------------------------------------

//----------Gestion des regex et des alertes----------
function textAlert(value) {
    return `${value} : veuillez remplir correctement ce champ.`;
}

function regExLastnameFirstnameCity(value) {
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);    //la méthode test() vérifie s'il y a une correspondance entre un texte et une expression rationnelle.
}                                               //elle retourne true en succès, et false en cas contraire (booléen).

//**********Fin gestion des regex et des alertes**********

//----------fonction pour gérer l'affichage du texte en dessous de l'input pour indiquer qu'il faut le remplir correctement----------
function textCorrectFormField(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).textContent = "";
}

function textIncorrectFormField(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).textContent = "Veuillez remplir correctement ce champ.";
}

//**********Fin fonction pour gérer l'affichage du texte en dessous de l'input pour indiquer qu'il faut le remplir correctement**********

//----------fonction pour gérer l'affichage de la couleur de l'input si correct ou incorrect----------
function colorCorrectFormField(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).classList.add("is-valid");
    document.querySelector(`#${querySelectorId}`).classList.remove("is-invalid");
}

function colorIncorrectFormField(querySelectorId) {
    document.querySelector(`#${querySelectorId}`).classList.add("is-invalid");
}

//**********Fin fonction pour gérer l'affichage de la couleur de l'input si correct ou incorrect**********

//****************************************Fin fonctions gestion des validations formulaire****************************************





//----------------------------------------Mettre le contenu du localStorage dans les champs du formulaire pour que ça reste----------------------------------------

//Prendre la key dans le localStorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem("formValues");

//Convertir la chaîne de caractère en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//Fonction pour que le champ du formulaire soit rempli par les données du localStorage si elles existent
function fillInputWithLocalStorage(input) {
    if(dataLocalStorageObjet == null) {
        
    }else{
        document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
    }
}

fillInputWithLocalStorage("lastname");
fillInputWithLocalStorage("firstname");
fillInputWithLocalStorage("address");
fillInputWithLocalStorage("city");
fillInputWithLocalStorage("email");

//****************************************Fin mettre le contenu du localStorage dans les champs du formulaire pour que ça reste****************************************





//----------------------------------------Envoie des données au serveur----------------------------------------

//Fonction récupération des values du formulaire, des produits sélectionnés, et du total du panier pour envoyer au serveur
function sendForm() {
    let contact = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("lastname").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    };
    
    let products = [];
    //pour chaque produit on push dans le tableau "products"
    for (let z = 0; z < productSaveInLocalStorage.length; z++) {
        for(let q = 0; q < productSaveInLocalStorage[z].quantity; q++) {
            products.push(productSaveInLocalStorage[z].id);
        }
    }
    
    let contactItems = JSON.stringify({
        contact, products
    })
    postOrder(contactItems);
}

//Récupération du total du panier
let totalOrderAmountPost = document.getElementById("totalOrderAmountId").innerText.trim();
console.log(totalOrderAmountPost);

//Fonction requête POST, envoie des données au serveur
function postOrder(contactItems) {
    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: contactItems
    })
    .then(response => {
        return response.json();
    }) 
    .then(r => {
        localStorage.setItem('contact', JSON.stringify(r.contact));
        localStorage.setItem('orderId', JSON.stringify(r.orderId));
        localStorage.setItem('totalPrice', JSON.stringify(totalOrderAmountPost));
        localStorage.removeItem('cart');
        window.location.replace("./order_confirmation.html");
    })
    .catch(err => {
        console.log(err);
    })
}

//****************************************Fin envoie des données au serveur****************************************