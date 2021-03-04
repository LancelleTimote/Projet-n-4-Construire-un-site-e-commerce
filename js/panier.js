console.log(localStorage.getItem("cart"));

function affichagePanier () {
      let cartItems = localStorage.getItem('cart');
      cartItems = JSON.parse(cartItems);
      let productsInCart = document.getElementById('cart');
      if (cartItems && productsInCart) {
            productsInCart.innerHTML = '';
            Object.values(cartItems).map(item => {    //Object.values renvoie un tableau contenant les valeurs des propriétés d'un objet dont l'ordre est le même que celui obtenu avec une boucle
                  productsInCart.innerHTML = '<tr>'   //La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
                  +'<th scope="row"><img src='' alt="Photo ours en peluche" class="d-block mx-auto border border-success shadow"></th>'
                  +'<td></td>'
                  +'<td></td>'
                  +'<td></td>'
                  +'</tr>'
            })
      }
}