var app = require('./../app.js');
var slot = require('./../slot/slot.js');
var fileLoader = require('./fileLoader');
var assetManager = require('./assetManager');
var loader = exports;
var gameData;

var loadedCounter = 0;
var toLoad;

function jsonLoadResponse(dataVar){
    console.log("Game data is loading");
    return dataVar;
}

loader.start = function(counter){
    loader.loadJSON(assetsJSON);
}

//loaderCtr keeps data of how many json files will be loaded
loader.loadJSON = function (path, callback, arg){
    //Get game data from json
    fileLoader.loadJSON(path, function f(response){
        gameData = JSON.parse(jsonLoadResponse(response));
        loader.loadComplete(callback, arg);
    });
}

loader.loadComplete = function (callback, arg){
    //slot.symbolTextures = assetManager.getSymbolTextures(gameData);
    console.log("All assets are loaded, starting game...");
    callback(gameData, arg);
}