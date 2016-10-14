var objectManager = exports;

var gameManager = require('./../gameManager.js');
var PIXI = require('pixi.js');

objectManager.start = function(){
    console.log("object manager started");
}
 
objectManager.createObject = function(args){
    switch (args.type) {
        case background:
            createBackgroundObject(args);
            break;
    
        default:
            break;
    }
}

objectManager.createBackgroundObject = function(args){
    console.log("creating background object named: " + args.name);
    var t = new PIXI.Sprite(gameManager.assetManager.uiAssets.resources['frame'].texture);
    console.log(t);
    gameManager.app.addChildToStage(t);
}

function createButtonObject(args){
    console.log("creating button object");
}

function createContainerObject(args){
    console.log("creating container object");
}
