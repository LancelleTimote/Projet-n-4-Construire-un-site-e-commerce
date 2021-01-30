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
    
    let image = document.getElementById('image');
    image.src = response.imageUrl;

    let name = document.getElementById('name');
    name.innerHTML = response.name;
    
    let description = document.getElementById('description');
    description.innerHTML = response.description;
    
    let color = document.getElementById("selectColor");
    let options = response.colors;
    for(i=0; i<options.length; i++) {
        let opt = options[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        color.appendChild(el);
    }
    
    let price = document.getElementById('price');
    price.innerHTML = "Prix : "+response.price+" €";

    
}


// let colors = document.getElementById('color');
// colors.innerHTML = response.colors;

// for(let i=0; i<response.colors.length; i++) {
//         let colors = response[i].colors;
//         let color = document.getElementById('couleur');
//         color.innerHTML = '<option>'+colors+'</option>';
//     }
//     console.log(couleur);