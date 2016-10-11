var game = require('./../slot/slot.js');
var fileLoader = require('./fileLoader');
var loader = exports;
var gameData;

var loadedCounter = 0;
var toLoad;
var gameJSON = '/../../data/txt/slotGame.json';

function jsonLoadResponse(dataVar){
    ("Game data is loading");
    return dataVar;
}

//loaderCtr keeps data of how many json files will be loaded
loader.startLoader = function (loaderCtr){
    console.log("Loader is initiated");
    toLoad = loaderCtr;
    //Get game data from json
    fileLoader.loadJSON(gameJSON, function f(response){
        gameData = JSON.parse(jsonLoadResponse(response));
        loader.loadComplete();
    });
}

loader.loadComplete = function (){
    loadedCounter++;
    if(loadedCounter == toLoad){
        console.log("All assets are loaded, starting game...");
    }
    game.initSlot(gameData);
}