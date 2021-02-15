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
    for(i=0; i<options.length; i++) {
        let opt = options[i];
        let el = document.createElement('option');
        el.textContent = opt;
        el.value = opt;
        color.appendChild(el);
    }

    let price = document.getElementById('price');
    price.innerHTML = "Prix : "+response.price+" €";

    let produits = [
        {
            picture : response.imageUrl,
            color : null,
            name : response.name,
            price : response.price,
        }
    ]

    // Sauvegarder les informations dans l’espace local courant
    let add_button_elt = document.getElementById('add_to_cart');
    function stockage_panier () {
        colorValue = document.getElementById('selectColor').value;
        produits[0].color = colorValue;
        localStorage.setItem("cart", JSON.stringify( produits ));
    }
    add_button_elt.addEventListener("click", function() {
        stockage_panier (); 
    })
}

// Accéder à des données enregistrées
// alert("username = " + localStorage.getItem("username"));

// let productColor = document.querySelector('select').value;
// console.log(productColor);


// let x = document.getElementById('selectColor').selectedIndex;
// console.log(x);
// let y = document.getElementById('selectColor').value;
// console.log(y);
// color : y[x].textContent,


// document.getElementsByTagName('select')[0].onchange = function() {
//     let index = this.selectedIndex;
//     let inputText = this.children[index].innerHTML.trim();
//     console.log(inputText);
// }


// color.addEventListener('change', function(productColor) {
//     let index = this.selectedIndex;
//     console.log(index);
//     let inputText = this.children[index].innerHTML.trim();
//     console.log(inputText);
// })


// T'es bien au sein d'une fonction qui s'éxécute lors d'un clique ?
// Sinon oui, par défaut t'auras une valeur fixe (généralement la première) :')

// Tu ne peux pas récupérer la valeur selectionée par l'utilisateur de l'input sans eventListener
// ah si il peut
// mais ça va récupérer la valeur à l'execution de la fonction (chargement de la page) donc la valeur par défaut
// au lieu de la valeur selectionnée
// Donc on est d'accord qu'il ne peut pas récupérer la valeur de la couleur demandée par l'user (a moins que ça ne soit la couleur par défaut) :') **sans eventListener
// ben c'est plus la formulation, y'a rien qui l'empêche de la récupérer à ce moment là, mais c'est pas la bonne