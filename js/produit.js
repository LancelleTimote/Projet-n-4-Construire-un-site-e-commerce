let url = new URL(document.location.href);
let id = url.searchParams.get("id");
console.log(id);

//création requête get
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        requestDone (response)
    }
};
console.log("http://localhost:3000/api/teddies/"+id);
request.open("GET", "http://localhost:3000/api/teddies/"+id);
request.send();

//fonction succès requête
function requestDone (response) {
    console.log(response);
    
    let picture = document.getElementById('picture');
    picture.src = response.imageUrl;

    let name = document.getElementById('name');
    name.innerHTML = response.name;
    
    let description = document.getElementById('description');
    description.innerHTML = response.description;
    
    let color = document.getElementById('selectColor');
    let options = response.colors;
    for(j = 0; j < options.length; j++) {
        let opt = options[j];
        let el = document.createElement('option');
        el.textContent = opt;
        el.value = opt;
        color.appendChild(el);
    }

    let price = document.getElementById('price');
    price.innerHTML = "Prix : "+response.price/100+" €";

    //séléction du bouton ajouter l'article au panier
    const sendCart = document.getElementById('add_to_cart');

    //----------------------------------------addEventListener --- écouter le bouton et envoyer au panier
    sendCart.addEventListener("click", (event) => {
        event.preventDefault();

        //séléction de la couleur
        const colorChoice = selectColor.value;

        //récupération des valeurs du produit
        let values_product = {
                id: id,
                name : response.name,
                picture : response.imageUrl,
                color : colorChoice,
                price : response.price/100+" €",
                quantity : 1,
        };
        console.log(values_product);

        //----------------------------------------Le localStorage----------------------------------------
        //stocker la récupération des valeurs des produits dans le localStorage

        //déclaration de la variable "productSaveInLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
        let productSaveInLocalStorage = JSON.parse(localStorage.getItem('cart'));
        //JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript

        //fonction fenêtre popup
        const popupConfirmation = () => {
            if(window.confirm(`${response.name} avec l'option : ${colorChoice} a bien été ajouté au panier. Consulter le panier OK ou revenir à l'accueil Annuler`)){
                window.location.href = "panier.html";
            }else{
                window.location.href = "index.html";
            }
        }

        //Fonction ajouter un produit sélectionné dans le localStorage
        const addProductLocalStorage = () => {
            //ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
            productSaveInLocalStorage.push(values_product);
            //la transformation en format JSON et l'envoyer dans la key "cart" du localStorage
            localStorage.setItem('cart', JSON.stringify(productSaveInLocalStorage));
        };

        //s'il y a déjà des produits enregistrés dans le localStorage
        if(productSaveInLocalStorage) {
            addProductLocalStorage();
            popupConfirmation();
        }
        //s'il n'y a pas de produit d'enregistré dans le localStorage
        else{
            productSaveInLocalStorage = [];
            addProductLocalStorage();
            popupConfirmation();
        }
    });
}