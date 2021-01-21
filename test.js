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
    for (i=0; i<response.length; i++) {
        let imageUrl = response[i].imageUrl;
        let name = response[i].name;
        let description = response[i].description;
        let id = response[i]._id;

        //création carte produit
        let carte = document.createElement("div");
        carte.classList.add("col-12","col-lg-4");
        carte.innerHTML = '<div class="card mb-4 mb-lg-0 border-light shadow-sm">'
        +'<img src='+imageUrl+' alt="Photo ours en peluche" class="card-img-top">'
        +'<div class="card-body">'
            +'<h5 class="card-title">'+name+'</h5>'
            +'<p class="card-text">'+description+'</p>'
            +'<a href="produit.html?id='+id+'" class="btn btn-primary stretched-link" role="button">Détails</a>'
        +'</div>'
        +'</div>';

        //append de la carte sur la listeCartes
        listeCartes.appendChild(carte);
    }
    console.log(listeCartes);
}

