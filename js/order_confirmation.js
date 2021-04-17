//Récupération des éléments dans le localStorage pour les afficher sur la confirmation de la commande
const contact = JSON.parse(localStorage.getItem("contact"));
const orderId = JSON.parse(localStorage.getItem("orderId"));
const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

//Création des éléments pour les ajouter dans le HTML
const html = `
    <h2 class="text-success">Merci ${contact.firstName},</br>
    votre commande a bien été enregistrée !</h2>
    <img src="pictures/thumb_up.png" alt="Photo ours en peluche">
    <ul class="mb-4 ul-order">
        <li>Votre commande sera expédié sous peu avec les coordonnées suivantes :</li>
        <li>Nom : <span class="font-weight-bold">${contact.lastName}</span></li>
        <li>Prénom : <span class="font-weight-bold">${contact.firstName}</span></li>
        <li>Adresse : <span class="font-weight-bold">${contact.address}</span></li>
        <li>Ville : <span class="font-weight-bold">${contact.city}</span></li>
        <li>Email : <span class="font-weight-bold">${contact.email}</span></li>
    </ul>
    <h3 class="h3-order font-weight-normal">Montant total de la commande : <span class="font-weight-bold">${totalPrice} €</span></h3>
    <h3 class="my-4 h3-order font-weight-normal">Le numéro de votre commande :</br>
    <span class="font-weight-bold">${orderId}</span></h3>
    <p class="p-order">Nous vous remercions de votre confiance et</br>
    pour avoir choisi Oriteddy pour votre achat.</p>
`

//Injection des éléments dans le HTML
document.getElementById("orderConfirmed").innerHTML = html;


//Suppression des éléments stocké dans le localStorage
localStorage.removeItem("contact");
localStorage.removeItem("totalPrice");
localStorage.removeItem("orderId");