            // var jeu = require("./jeu.js");
            // var toolbox = require("./toolbox.js");

            //jeu.initialisation();
            //jeu.afficherGrille();
            //while(true){
                //if(jouer()) return;//J1
                //if(jouer()) return;//J2
            //}

            //function jouer(ligne,colonne){
                // var saisieLigne = toolbox.saisirEntier("Jouer en quelle ligne ? : ");
                // var saisieColonne = toolbox.saisirEntier("Jouer en quelle colonne ? : ");
            //     console.log(ligne + " : " + colonne);
            //     var isOver = jeu.jouerCase(ligne,colonne);
            //     jeu.afficherGrille();
            //     return isOver;
            // }

            //module.exports = jeu;



            const tour = document.querySelector("#tour");
            const alert = document.querySelector(".alert");
            const messageJ1 = document.querySelector("#j1");
            const messageJ2 = document.querySelector("#j2");
            var joueurEncours = 1;
            var finJeu = false;
            var nbBateauSaisie = 0;

            var pointJ1 = 0;
            var pointJ2 = 0;

            //var isIAON = false;

           // initialisationTableau();
            // placeForTest(0);
            // placeForTest(0);
            // placeForTest(1);
            // placeForTest(1);
            // placeForTest(0);
            // placeForTest(1);




            function jouer(ligne,colonne){
            jouerCase(ligne,colonne);
            var celluleIA = IA.getCellule();
            jouerCase(celluleIA.ligne,celluleIA.colonne)

            }




            function jouerCase(ligne,colonne){
                    if(!finJeu){
                        jeu.jouerCase(ligne,colonne);
                        jeu.afficherGrille();
                        if(jeu.verificationFinJeu(joueurEncours)){
                        gererFinJeu();
                        }
                        if(joueurEncours === 1){
                        joueurEncours = 2;
                        tour.innerHTML = "Tour du Joueur 2";
                        }else {
                        joueurEncours = 1;
                        tour.innerHTML = "Tour du Joueur 1";
                        }
                    
            }

            }
                    
            function initialisationTableau(nbBateau){
                jeu.nbCaseJ1 = 0;
                jeu.nbCaseJ2 = 0;
            finJeu = false;
            joueurEncours = 1;
            alert.classList.add("d-none");
            var contentJ1 = "<img src='./images/j1.png' class='bg-danger rounded-circle' /><br />";
            contentJ1 += pointJ1;
            messageJ1.innerHTML = contentJ1;

            var contentJ2 = "<img src='./images/j2.png' class='bg-info rounded-circle' /><br />";
            contentJ2 += pointJ2;
            messageJ2.innerHTML = contentJ2;

            jeu.initialisation(nbBateau);
            jeu.afficherGrille();
            }

            function gererFinJeu(){
            finJeu = true;
            var contentAlert = "Partie Terminée, le gagnant est : " + joueurEncours + "<br />";
            contentAlert += '<button type="button" class="btn btn-secondary" onClick = initialisationTableau()>Recommencez</button>';
            //alert.innerHTML = contentAlert;
            //alert.classList.remove("d-none");
            afficherAlert(contentAlert,1);
            if(joueurEncours ===1){
                pointJ1++;
            }else {
                pointJ2++;
            }
                
            }
            function afficherAlert(txt,type){
                if(type ===1){
                     alert.classList.add("alert-success");
                     alert.classList.remove("alert-danger");
                }else {
                    alert.classList.remove("alert-success");
                    alert.classList.add("alert-danger");
                }
                alert.innerHTML = txt;
                alert.classList.remove("d-none");

            }
            function StartGame(){
                nbBateauSaisie = parseInt(document.querySelector("#nbBateau").value);
              if(nbBateauSaisie < 2) afficherAlert("le nombre de bateau doit etre supperieur a 2",2);
              if(nbBateauSaisie > 4) afficherAlert("le nombre de bateau doit etre inferieur a 5",2);
              if(nbBateauSaisie >=2 && nbBateauSaisie <=4) initialisationTableau(nbBateauSaisie);
            }

            addEventListener("click" , function (event){
              var target = event.target;
              console.log(event);
              if(target.id === "play"){
               //console.log("Tire sur la grille");
               var image = "<img src='./images/explo/explosion00.png' id='explo'style='width:100px;height:100px;position:absolute;top:"+(event.clientY-50)+"px;left:"+(event.clientX-50)+"px '/>";
               var body = document.querySelector("body");
               var element = document.createElement("p");
               element.innerHTML = image;
               body.appendChild(element);

               imageExplo(9);
               function imageExplo(time){
                   var explo = document.querySelector("#explo");
                   if(time >=1){
                       if(time === 9) explo.setAttribute("src","./images/explo/explosion01.png");
                       if(time === 8) explo.setAttribute("src","./images/explo/explosion02.png");
                       if(time === 7) explo.setAttribute("src","./images/explo/explosion03.png");
                       if(time === 6) explo.setAttribute("src","./images/explo/explosion04.png");
                       if(time === 5) explo.setAttribute("src","./images/explo/explosion05.png");
                       if(time === 4) explo.setAttribute("src","./images/explo/explosion06.png");
                       if(time === 3) explo.setAttribute("src","./images/explo/explosion07.png");
                       if(time === 2) explo.setAttribute("src","./images/explo/explosion08.png");
                       if(time === 1) explo.remove(this);
                       setTimeout(function(){
                        imageExplo(time-1);  
                       },100);
                       
                       
                   }
               }
            }
            });







