//création requête get
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        requestDone (response)
    }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();

//fonction succès requête
function requestDone (response) {
    console.log(response);

    //récupération de la listeCartes
    let listeCartes = document.getElementById("listeCartes");

    //boucle parcours réponse requête
    for (i=0; i<response.length; i++) { //for pour définir la boucle, i pour donner un indice qui commence à 0, boucle qui continue tant qu'inférieur aux réponses, puis rajoute 1 à i à chaque fois
        let imageUrl = response[i].imageUrl;
        let name = response[i].name;
        let description = response[i].description;
        let id = response[i]._id;

        //création carte produit
        let carte = document.createElement("section");  //on crée une div
        carte.classList.add("card-deck","col-lg-4");    //on ajoute deux class à la div
        carte.innerHTML = '<div class="card border-success shadow mb-4">'   //on ajoute du contenu dans la div
        +'<img src='+imageUrl+' alt="Photo ours en peluche" class="card-img-top">'
        +'<div class="card-body">'
            +'<h5 class="card-title">'+name+'</h5>'
            +'<p class="card-text">'+description+'</p>'
            +'<a href="produit.html?id='+id+'" class="btn btn-success" role="button">Détails</a>'
        +'</div>'
        +'</div>';

        //append de la carte sur la listeCartes
        listeCartes.appendChild(carte); //permet d'ajouter les cartes à l'endroit où il y a l'id listeCartes
    }
    console.log(listeCartes); 
}

