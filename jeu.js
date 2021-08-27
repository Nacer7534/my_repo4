//var toolbox = require("./toolbox.js");

            var jeu = {
                nbColonne : 5,
                nbLigne : 5,
                grille : [],

                nbCaseJ1 : 0,
                nbCaseJ2 : 0,

                initialisation : function(nbBateau){
                    this.nbColonne = nbBateau * 2+1;
                    this.nbLigne = nbBateau * 2+1;
                    this.grille = toolbox.initialiserTableauVide(this.nbLigne,this.nbColonne,0);
                    
                    for(var i =1; i <= nbBateau; i++){
                        this.positionnerBateau((i+1),1);
                        this.nbCaseJ1 += i+1;
                        this.positionnerBateau((i+1),2);
                        this.nbCaseJ2 += i+1;
                    }
                    // this.positionnerBateau(3,1);
                    // this.nbCaseJ1 += 3;
                    // this.positionnerBateau(2,1);
                    // this.nbCaseJ1 += 2;
                    // this.positionnerBateau(3,2);
                    // this.nbCaseJ2 += 3;
                    // this.positionnerBateau(2,2);
                    // this.nbCaseJ2 += 2;
                },

                positionnerBateau : function(taille,joueur){
                    // var bateau = {
                    //     case1 : {
                    //         x : null,
                    //         y : null,
                    //     },
                    //     case2 : {
                    //         x : null,
                    //         y : null,
                    //     },
                    //     case3 : {
                    //         x : null,
                    //         y : null,
                    //     }
                    // };
                    var bateau = {};
                    var positionTermine = false;
                    while(!positionTermine){
                        var tailleXMax = 0;
                        var tailleYMax = 0;
                        var isHorizental = Math.floor(Math.random() * 2);
                        if(isHorizental){
                            tailleXMax = this.nbLigne -(taille-1);
                            tailleYMax = this.nbColonne;
                        }else {
                            tailleXMax = this.nbLigne;
                            tailleYMax = this.nbColonne -(taille-1);
                        }
                        
                        var xAlea = Math.floor(Math.random() * tailleXMax);
                        var yAlea = Math.floor(Math.random() * tailleYMax);
                        
                
                        var isCaseVide = true;
                        for(var i =1 ; i <= taille && isCaseVide; i++){
                            bateau["case"+i] = this.getCaseCreationBateau(xAlea, yAlea, isHorizental, i);
                            isCaseVide = this.verifCaseVide(bateau["case"+i]);
                        }
                        if(isCaseVide) positionTermine = true;
                    }
                    this.enregistrerGrille(bateau,joueur);
                },

                getCaseCreationBateau : function(xAlea,yAlea,isHorizontal,numCase){
                    
                        var cellule = {};
                        if(isHorizontal){
                            cellule.x = xAlea + (numCase-1);
                            cellule.y = yAlea;
                        } else {
                            cellule.x = xAlea;
                            cellule.y = yAlea + (numCase-1);
                        }
                        return cellule;

                },
                verifCaseVide : function(caseB){
                    if(this.grille[caseB.x][caseB.y] === 0) return true;
                    return false;
            
                },
                enregistrerGrille : function (bateau,joueur){ 
                    for(var cellule in bateau){
                    this.grille[bateau[cellule].x][bateau[cellule].y] = joueur;
                }
                
               },
                afficherGrille : function(){
                const jeu = document.querySelector("#jeu");
                jeu.innerHTML = "";
                var ratio = (100-(10 * (this.nbColonne-5)+1));
                // cela veut dire : 2 bateau --> 5 colone et on va diminuer le px en 90px 
                //3 bateau --> 7 colonne  -->   on va diminuer le px en 70px 
                //et 4 bateau --> 9 colonne --> on va diminuer le px en 50px 
                var content = "<table>";
                    for(var i=0; i < this.nbLigne;i++){
                        content += "<tr>";
                        for(var j=0 ; j < this.nbColonne;j++){
                            content += "<td class='border text-center' style='width:"+ratio+"px;height:"+ratio+"px'>";
                            if(this.grille[i][j]=== 0){
                                content += "<button id= 'play' class='btn btn-secondary' onClick='jouer("+i+","+j+")'>Tirez</button>";
                            } 

                            if(this.grille[i][j]=== 1){
                                //content += "<button class='btn btn-secondary' onClick='jouer("+i+","+j+")'>Tirer</button>";
                                content += "<img src='./images/J1.png'style='width:"+ratio+"px;height:"+ratio+"px' class='bg-danger rounded-circle' />";
                            } 
                            if(this.grille[i][j]=== 2){
                                content += "<button id= 'play' class='btn btn-secondary' onClick='jouer("+i+","+j+")'>Tirez</button>";
                                //content += "<img src='./images/J2.png' class='bg-info rounded-circle' />";
                            }
                            if(this.grille[i][j]=== 3){
                                content += "<img src='./images/croix.png'style='width:"+ratio+"px;height:"+ratio+"px' />";
                            }
                            if(this.grille[i][j]=== 4){
                                
                                content += "<img src='./images/croix.png' class='bg-danger rounded-circle'style='width:"+ratio+"px;height:"+ratio+"px' />";
                            }
                            if(this.grille[i][j]=== 5){
                               
                                content += "<img src='./images/croix.png' class='bg-info rounded-circle'style='width:"+ratio+"px;height:"+ratio+"px' />";
                            }  
                               content += "</td>";
                        }
                               content += "</tr>";
                    }
                               content += "</table>";
                               jeu.innerHTML = content;
                    // for(var i=0; i < this.nbLigne; i++){
                    //     var txt = "";
                    //     for(var j=0; j < this.nbColonne; j++){
                    //         txt += "| ";
                    //         if(this.grille[i][j]===0){
                    //             txt += "_";
                    //         } else if(this.grille[i][j]===1){
                    //             txt += "x";
                    //         } else if(this.grille[i][j]===2){
                    //             txt += "o";
                    //         } else if(this.grille[i][j]===3){
                    //             txt += "D";
                    //         }
                    //         txt += " |";
                    //     }
                    //     console.log(txt);
                    // }
                },
                  
                 jouerCase : function(ligne,colonne){
                     if(this.grille[ligne][colonne]=== 0){
                        this.grille[ligne][colonne] = 3;
                     }
                    if(this.grille[ligne][colonne] === 1){
                        this.nbCaseJ1--;
                        this.grille[ligne][colonne] = 4;
                    } 
                    if(this.grille[ligne][colonne] === 2){
                        this.nbCaseJ2--;
                        this.grille[ligne][colonne] = 5;
                    } 
                },
                verificationFinJeu : function(){
                    if(this.nbCaseJ1 <=0 || this.nbCaseJ2 <=0) return true;
                }


                

            
}
//module.exports = jeu;