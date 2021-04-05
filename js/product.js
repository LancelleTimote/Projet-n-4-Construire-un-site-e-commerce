let url = new URL(document.location.href);
let id = url.searchParams.get("id");
console.log(id);

//----------------------------------------Récupération des produits présents sur l'api avec requête get----------------------------------------
let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        requestDone (response)
    }
};
console.log("http://localhost:3000/api/teddies/"+id);
request.open("GET", "http://localhost:3000/api/teddies/"+id);
request.send();

//****************************************Fin de la récupération des produits présents sur l'api avec requête get****************************************

//----------------------------------------Fonction succès requête----------------------------------------
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

    //Sélection du bouton ajouter l'article au panier
    const sendCart = document.getElementById('add_to_cart');

    //----------------------------------------addEventListener --- Écouter le bouton et envoyer au panier
    sendCart.addEventListener("click", (event) => {
        event.preventDefault();

        //Sélection de la couleur
        const colorChoice = selectColor.value;

        //Récupération des valeurs du produit
        let values_product = null;
        values_product = {
                id: id,
                name : response.name,
                picture : response.imageUrl,
                color : colorChoice,
                price : response.price/100,
                quantity : 1,
        };
        console.log(values_product);

        //----------------------------------------localStorage----------------------------------------
        //Stocker la récupération des valeurs des produits dans le localStorage

        //Déclaration de la variable "productSaveInLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
        let productSaveInLocalStorage = JSON.parse(localStorage.getItem('cart'));
        //JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript

        //Fonction fenêtre popup
        const popupConfirmation = () => {
            if(window.confirm(`${response.name} avec l'option : ${colorChoice} a bien été ajouté au panier. Consulter le panier OK ou revenir à l'accueil Annuler`)){
                window.location.href = "cart.html";
            }else{
                window.location.href = "index.html";
            }
        }

        //S'il y a déjà des produits enregistrés dans le localStorage
        if(productSaveInLocalStorage) {
            console.log("Un panier existe");
            let productFindInCart = false;
            let productIdInCart = null;
            console.log("On parcourt le panier");
            for(x = 0; x < productSaveInLocalStorage.length; x++) {
                console.log("item du panier #"+x+" ("+productSaveInLocalStorage[x].name+")");
                if(values_product.id === productSaveInLocalStorage[x].id && values_product.color === productSaveInLocalStorage[x].color) {
                    console.log("produit du panier = produit cliqué");
                    productFindInCart = true;
                    productIdInCart = x;
                }else{
                    console.log("produit du panier != produit cliqué");
                }
            }
            //si le produit existe dans le panier
            if(productFindInCart) {
                //on ajoute 1 à la quantité du produit
                console.log("on ajoute 1 à la quantité du produit");
                productSaveInLocalStorage[productIdInCart].quantity += 1;
            //si le produit n'existe pas dans le panier
            }else{
                //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
                console.log('On push values_product');
                productSaveInLocalStorage.push(values_product);
            }
            popupConfirmation();
        }
        //S'il n'y a pas de produit enregistré dans le localStorage
        else{
            productSaveInLocalStorage = [];
            //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
            productSaveInLocalStorage.push(values_product);
            popupConfirmation();
        }
        //Transformation en format JSON et l'envoyer dans la key "cart" du localStorage
        localStorage.setItem('cart', JSON.stringify(productSaveInLocalStorage));
    });
}

//****************************************Fin de la fonction succès requête****************************************