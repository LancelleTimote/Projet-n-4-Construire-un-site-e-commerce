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

    let add = document.getElementById('add_to_cart');
    let cart = document.getElementById('cart');
    add.addEventListener("click", function() {
        cart = document.createElement("tr");
        cart.innerHTML = '<th scope="row"><img src='+image+' alt="Photo ours en peluche" class="d-block mx-auto border border-success shadow"></th>'
        +'<td>'+name+'</td>'
        +'<td>'+color+'</td>'
        +'<td>'+price+'</td>'
        +'<td></td>'
    })
}

{/* <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
</tr> */}