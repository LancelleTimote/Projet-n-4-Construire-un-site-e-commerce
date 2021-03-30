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
        console.log("clic bouton");
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
        // console.log(values_product);

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
        console.log("values_product :");
        console.log(values_product);
        if(productSaveInLocalStorage) {
            console.log("productSaveInLocalStorage :");
            console.log(productSaveInLocalStorage);
            let productProceed = false;
            for(x = 0; x < productSaveInLocalStorage.length; x++) {
                console.log(productSaveInLocalStorage[x].id);
                console.log(productSaveInLocalStorage[x].name);
                console.log(productSaveInLocalStorage[x].color);
                if(values_product.id === productSaveInLocalStorage[x].id && values_product.color === productSaveInLocalStorage[x].color) {
                    console.log("produits identique");
                    console.log(productSaveInLocalStorage[x]);
                    //déclarer les 2 quantités pour ensuite pouvoir les ajouter
                    // productSaveInLocalStorage[x].quantity = productSaveInLocalStorage[x].quantity += 1;
                    console.log(productSaveInLocalStorage[x].quantity);
                    productSaveInLocalStorage[x].quantity +=1;
                    console.log(productSaveInLocalStorage[x].quantity);
                    //assigner à cette entrée du localStorage la nouvelle quantité
    
                    productProceed = true;
                }else{
                    console.log("produits différents");
                    //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
                    productSaveInLocalStorage.push(values_product);
                }
                //Transformation en format JSON et l'envoyer dans la key "cart" du localStorage
                localStorage.setItem('cart', JSON.stringify(productSaveInLocalStorage));
                if(productProceed) {
                    x = productSaveInLocalStorage.length;
                }
                // popupConfirmation();
            }
        }
        //S'il n'y a pas de produit enregistré dans le localStorage
        else{
            productSaveInLocalStorage = [];
            //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
            productSaveInLocalStorage.push(values_product);
            //Transformation en format JSON et l'envoyer dans la key "cart" du localStorage
            localStorage.setItem('cart', JSON.stringify(productSaveInLocalStorage));
            // popupConfirmation();
        }
    });
}

//****************************************Fin de la fonction succès requête****************************************


// //Fonction ajouter un produit sélectionné dans le localStorage
// const addProductLocalStorage = () => {
//     //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
//     productSaveInLocalStorage.push(values_product);
//     //Transformation en format JSON et l'envoyer dans la key "cart" du localStorage
//     localStorage.setItem('cart', JSON.stringify(productSaveInLocalStorage));
// };

// //S'il y a déjà des produits enregistrés dans le localStorage
// if(productSaveInLocalStorage) {
//     addProductLocalStorage();
//     popupConfirmation();
// }
// //S'il n'y a pas de produit enregistré dans le localStorage
// else{
//     productSaveInLocalStorage = [];
//     addProductLocalStorage();
//     popupConfirmation();
// }