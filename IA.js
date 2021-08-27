        var IA = {
            getCellule : function(){
                var cellulesPossible = this.getAllCellulePossible();
                //console.log(cellulesPossible);
                //var randomCel = Math.floor(Math.random() * cellulesPossible.length);
                var cellule = this.getBestRandomCelluleAvecPoids(cellulesPossible);
                return cellule;
            },
            getAllCellulePossible : function(){
                var celluleVide = [];
                for(var i=0; i < jeu.nbLigne; i++){
                    for(var j=0; j < jeu.nbColonne; j++){
                        if(jeu.grille[i][j] ===0 ||jeu.grille[i][j] ===1){
                            var cel = {
                                ligne : i,
                                colonne: j,
                                poids : this.getPoidsCel(i,j),
                            }
                            celluleVide.push(cel);
                        }
                    }
                }
                return celluleVide;
            },

            getPoidsCel : function(ligne,colonne){
                var poidsCellule = 1;
                if((colonne+1 < jeu.nbColonne) && jeu.grille[ligne][colonne+1]=== 4) poidsCellule++;
                if((colonne-1 >= 0) && jeu.grille[ligne][colonne-1]=== 4) poidsCellule++;
                if((ligne+1 < jeu.nbLigne) && jeu.grille[ligne+1][colonne]=== 4) poidsCellule++;
                if((ligne-1 >= 0) && jeu.grille[ligne-1][colonne]=== 4) poidsCellule++;
                return poidsCellule;
            },

            getBestRandomCelluleAvecPoids : function(cellules){
                var bestCel = 0;
                var bestCellules = [0];
                for(var i =1; i < cellules.length; i++){
                    if(cellules[i].poids > cellules[bestCel].poids){
                        bestCel = i;
                        bestCellules = new Array();
                        bestCellules.push(i);
                    }else if (cellules[i].poids === cellules[bestCel].poids){
                        bestCellules.push(i);
                    }
                }
                var randomCel = Math.floor(Math.random() * bestCellules.length);
                return cellules[bestCellules[randomCel]];
            }
        }

