//----------------------------------------Récupération des produits présents sur l'api avec requête get----------------------------------------
let request = new XMLHttpRequest();         //création de la nouvelle requête
request.onreadystatechange = function() {   //propriété permet de lancer un traitement à chaque étape d'avancement de l'appel
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { //vérification si la requête est terminée et si elle s'est bien déroulée avec readyState .DONE et status 200
        let response = JSON.parse(this.responseText);   //transforme la réponse en JavaScript
        requestDone (response)
    }
};
request.open("GET", "http://localhost:3000/api/teddies");   //GET car on veut récupérer les données
request.send();                                             //on envoie la requête au service web

//****************************************Fin de la récupération des produits présents sur l'api avec requête get****************************************

//----------------------------------------Fonction succès requête----------------------------------------
function requestDone (response) {
    console.log(response);

    //Récupération de la listeCartes dans le HTML
    let cardList = document.getElementById("cardList");

    //Boucle parcours réponse requête
    for (i = 0; i < response.length; i++) { //i pour donner un indice qui commence à 0, boucle qui continue tant qu'inférieur aux réponses, puis rajoute 1 à i à chaque fois
        let imageUrl = response[i].imageUrl;
        let name = response[i].name;
        let description = response[i].description;
        let id = response[i]._id;

        //Création carte produit
        let card = document.createElement("section");  //On crée une div
        card.classList.add("card-deck", "card-size", "col-lg-4");    //On ajoute trois class à la div
        card.innerHTML = '<div class="card border-success shadow mb-4">'   //On ajoute du contenu dans la div
        +'<img src='+imageUrl+' alt="Photo ours en peluche" class="card-img-top">'
        +'<div class="card-body text-center">'
            +'<h5 class="card-title">'+name+'</h5>'
            +'<p class="card-text">'+description+'</p>'
            +'<a href="product.html?id='+id+'" class="btn btn-success" role="button">Détails</a>'
        +'</div>'
        +'</div>';

        //Append de la carte sur la listeCartes
        cardList.appendChild(card); //Permet d'ajouter les cartes à l'endroit où il y a l'id listeCartes
    }
    console.log(cardList); 
}

//****************************************Fin de la fonction succès requête****************************************