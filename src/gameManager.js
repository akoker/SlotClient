/*
This is a singleton instance which controls all of the game
states and asset management. This is the parent node of all
nodes which has to be pointed as the new objects are created
in order to be able to handle all of the objects on the game
scene.
*/

var objectManager = require('./engine/objectController.js');
var loader = require('./loader/loader.js');

var slot = require('./slot/slot.js');

var gameJSON = '/../../data/txt/slotGame.json';
var assetsJSON = '/../../data/txt/assets.json';

var assetData;
var gameData;

var gameManager = exports;

gameManager.app = require('./app.js');

var counter = 0;
var totalJSON = 2;


gameManager.assetManager = require('./loader/assetManager.js');
gameManager.slot = require('./slot/slot.js');
gameManager.objects = [];

gameManager.start = function(){
    console.log("game manager started");
    loader.loadJSON(assetsJSON, createJSONData, "assetData");
    loader.loadJSON(gameJSON, createJSONData, "gameData");
}

gameManager.initGame = function(){
    console.log("game is being initialized");

    //initialize slot game
    gameManager.slot.gameManager = this;
    gameManager.slot.initSlot(gameData, assetData);
    
    createScene(gameData);
    
}

gameManager.startSpinCycle = function(){
    for(var i = 0; i < gameData.settings.numberOfReels; i++){
        if(gameManager.slot.reelArr[i].isSpinning){
            gameManager.slot.reelArr[i].spinReel(gameData.settings.totalLength);
        }
    }
}

gameManager.getObjectByName = function(name, array){
    if(array.constructor !== Array){
        if(array.name == name) return array;
    }
    else{
        for(var i = 0; i < array.length; i++){
            if(array[i].name == name) 
                return array[i];
            if(array[i].children.length > 0){
                var a = searchChildrenByName(name, array[i].children);
                if(a!=null) return a;
            }
        }
    }
    return null;
}

function searchChildrenByName(name ,children){
    for(var i = 0; i < children.length; i++){
        if(name == children[i].name) return children[i];
        if(children[i].children != undefined)
            searchChildrenByName(name, children[i].children)
    }
}

function createJSONData(data, varName){
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

function createScene(){
    var n = slot.gameData.scene;
    var ar = traverse(n);
    gameManager.objects = ar;
    for(var i = 0; i < ar.length; i++){
        gameManager.app.addChildToStage(ar[i]);
    }
}

function traverse(p){
    var objArr = new Array();
    for(var i = 0; i < p.length; i++){
        var v = objectManager.createObject(p[i]);
        if(v!=null){
            objArr.push(v);
            if(p[i].children!=undefined){
                var ob = traverse(p[i].children);
                for(var j = 0; j < ob.length;j++)
                    v.addChild(ob[j]);
            }
        }
    }
    return objArr;
}