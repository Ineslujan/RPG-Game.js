# PLAN

HTML :

créer div vide avec id "board"

CSS :

.targetCell : background color green

.directionXXX{transform : rotate( 0 90 180 270)}   //A faire 4 fois

JS :

- objet "app" :
  - player : {
    - x : 0
    - y : 0
    - direction : "right"
  - targetCell : {
    - x : 5
    - y : 3
  - left : {
    - right : up
    - up : left
    - left : down
    - down : right
  - right: {
    - right : down
    - down : left
    - left : up
    - up : right
  - gameOver : false,
  - attempts : 0,
  - drawboard : function()
    - cette méthode crée les div et les ajoute au DOM
      - boucle dans une boucle
        - la div "board" doit avoir 4 div class "row"
        - chaque div "row"doit contenir 6 div class "cell" (70px de coté)
      - tests :
        - if coordonnéesX&Y current case === coordonnées "app.targetcell" : ajouter classe CSS targetCell + app.isGameOver()
        - if coordonnéesX&Y current case === coordonnées "app.player" : ajouter div  + classe "player" dans cette div + classe "directionXXX"
    - CSS pour obtenir l'exemple
  - clearBoard : function ()
    - ICI ça vide contenu de la div avec l'id "board"
  - redrawBoard : function ()
    - appelle les fonctions :
      - app.clearBoard()
        puis
      - app.drawboard()
  - turnLeft : function ()
    - si app/gameOver === false :
      - met à jour app.player.direction en fonction de la position courante
      - lors de l'action de cette fonction : rechercher la direction actuelle dans app.left."direction" et appliquer sa valeur dans  app.player.direction
      - app.redrawBoard()
  - turnRight : function ()
    - si app/gameOver === false :
      - met à jour app.player.direction en fonction de la position courante
      - lors de l'action de cette fonction : rechercher la direction actuelle dans app.right."direction" et appliquer sa valeur dans  app.player.direction
      - app.redrawBoard()
  - moveForward: function ()
    - si app/gameOver === false :
      - met à jour app.player.X/Y
      - Incrémenter ou désincrémenter :
        - right : +1 en X
        - up : +1 en Y
        - left : -1 en X
        - down : -1 en Y
      - si dépasse la table de jeu : alert()
      - app.redrawBoard()
  - listenKeyboardEvents : function ()
    - document.addeventlistener("keyup", (event){
      - event.target.(key à définir)
      - fleche droite ⇒ app.turnRight () + app.attempts +1
      - fleche gauche ⇒ app.turnRight () + app.attempts +1
      - enter ⇒ app.moveForward() + app.attempts +1
    - si on appuie sur d'autres touches : alert
  - isGameOver : function()
    - si player est sur target ⇒ app.gameOver = true⇒
  - init : function ()
    - app.drawboard ()
    - app.listenKeyboardEvents ()
