console.log(localStorage.getItem("cart"));

function affichagePanier () {
      let cartItems = localStorage.getItem('cart');
      cartItems = JSON.parse(cartItems);
}


{/* <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
</tr> */}

// let add = document.getElementById('add_to_cart');
//     let cart = document.getElementById('cart');
//     add.addEventListener("click", function() {
//         cart = document.createElement("tr");
//         cart.innerHTML = '<th scope="row"><img src='+image+' alt="Photo ours en peluche" class="d-block mx-auto border border-success shadow"></th>'
//         +'<td>'+name+'</td>'
//         +'<td>'+color+'</td>'
//         +'<td>'+price+'</td>'
//         +'<td></td>'
//     })


//Idée calcul affichage du prix

// class BankAccount {
//     constructor(owner, balance) {
//         this.owner = owner;
//         this.balance = balance;
//     }
    
//     showBalance() {     //nom de la fonction
//         console.log("Solde: " + this.balance + " EUR"); //quand on fait le console log, ça va donner le résultat dans new BankAccount
//     }
    
//     deposit(amount) {   //dépôt(montant)
//         console.log("Dépôt de " + amount + " EUR");
//         this.balance += amount;
//         this.showBalance();
//     }
    
//     withdraw(amount) {  //retrait(montant)
//         if (amount > this.balance) {
//             console.log("Retrait refusé !");
//         } else {
//             console.log("Retrait de " + amount + " EUR");
//             this.balance -= amount;
//             this.showBalance();
//         }
//     }
// }
// const newAccount = new BankAccount("Will Alexander", 500);

// newAccount.showBalance();   //affiche "Solde: 500 EUR"
// newAccount.deposit(50); //affiche "Déposé : 50 EUR" "Solde : 550 EUR"
// newAccount.withdraw(50);    //affiche "Retrait : 50 EUR" "Solde : 500 EUR"
// newAccount.withdraw(501);   //affiche "Retrait non autorisé !"


//Idée calcul affichage quantité / prix

// class Show {
//     constructor(title, numberOfSeasons) {
//       this.title = title;
//       this.numberOfSeasons = numberOfSeasons;
//       this.ratings = [];
//       this.averageRating = 0;
//     }
    
//     addRating(rating) { //nom de la fonction
//       this.ratings.push(rating);    //push va ajouter la moyenne des notes à la fin du tableau
//       let sum = 0;                  //au début la somme = 0
//       for (let rating of this.ratings) {    //pour chaque note de la fonction "this.ratings", il va y avoir somme += rating
//         sum += rating;
//       }
      
//       this.averageRating = sum / this.ratings.length;   //somme divisé par toutes les notes (length permet de savoir combien il y a de ratings)
//     }
    
// }