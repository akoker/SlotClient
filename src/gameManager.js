/*
This is a singleton instance which controls all of the game
states and asset management. This is the parent node of all
nodes which has to be pointed as the new objects are created
in order to be able to handle all of the objects on the game
scene.
*/

var app = require('./app.js');
var objectManager = require('./engine/objectController.js');
var loader = require('./loader/loader.js');

var gameJSON = '/../../data/txt/slotGame.json';
var assetsJSON = '/../../data/txt/assets.json';

var assetData;
var gameData = new Object();

var gameManager = exports;

var counter = 0;
var totalJSON = 2;


gameManager.assetManager = require('./loader/assetManager.js');
gameManager.slot = require('./slot/slot.js');

gameManager.start = function(){
    console.log("game manager started");
    loader.loadJSON(assetsJSON, createJSONData, "assetData");
    loader.loadJSON(gameJSON, createJSONData, "gameData");
    //objectManager.start();
}

gameManager.initGame = function(){
    console.log("game is being initialized");7

    //initialize slot game
    gameManager.slot.gameManager = this;
    gameManager.slot.initSlot(gameData, assetData);

    app.addReelsToStage(gameData);
}

function createJSONData(data, varName){
    console.log("assetData: " + data);

    if(varName == "assetData")
        assetData = data;
    else if(varName == "gameData")
        gameData = data;

    checkJSONComplete();
}

function checkJSONComplete(){
    counter++;
    if(counter == totalJSON)
        createAssets(assetData);
}

function createAssets(data){
    gameManager.assetManager.loadAssets(data, gameManager.slot);
}