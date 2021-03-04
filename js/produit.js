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

    //Renvoi les éléments propriété des produits
    let update_product = [
        {
            id: id,
            name : response.name,
            picture : response.imageUrl,
            color : null,
            price : response.price,
        }
    ]
    console.log(update_product);

    /**
     * Détecter s'il y a déjà un panier en localstorage
     * 
     * @return {boolean} renvoie true s'il y a un panier ou false s'il y en a pas
     */
    function cartExistsInStorage () {
        let cart = localStorage.getItem('cart');
        if (cart === null) {
            return false;
        } else {
            return true;
        }
    }

    function itemPanier() {
        console.log("function itemPanier()");
        // D'abord voit s'il y a localStorage existe ou non
        if (cartExistsInStorage()) {
            console.log("condition : panier existe");

        } else {
            console.log("condition : panier n'existe pas");
        }
    }
    itemPanier();

    // // Sauvegarder les informations dans l’espace local courant
    let add_button_elt = document.getElementById('add_to_cart');
    function stockage_panier () {
        colorValue = document.getElementById('selectColor').value;
        update_product[0].color = colorValue;
        localStorage.setItem("cart", JSON.stringify( update_product ));
    }
    add_button_elt.addEventListener("click", function(e) {
        e.preventDefault();
        stockage_panier ();
        update_product; 
    })

}