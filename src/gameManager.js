/*
This is a singleton instance which controls all of the game
states and asset management. This is the parent node of all
nodes which has to be pointed as the new objects are created
in order to be able to handle all of the objects on the game
scene.
*/

var objectManager = require('./engine/objectController.js');

var gameManager = exports;

gameManager.start = function(){
    console.log("game manager started");
    objectManager.start();
}
