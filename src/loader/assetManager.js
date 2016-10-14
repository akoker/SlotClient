var assetManager = exports;

var assetLoader = require('./assetLoader.js');
var gameManager = require('./../gameManager.js');

/*assetManager.getSymbolTextures = function(gameData){
    var symTPath = gameData.settings.symbolTextureAssetPath;
    console.log("loading symbol textures");
    var symbolTextures = new Array();
    for(var i = 0; i < gameData.symbolImages.length;i++){
        var t = symTPath + gameData.symbolImages[i].texture;
        symbolTextures.push(PIXI.Texture.fromImage(t));
    }
    return symbolTextures;
}*/

var totalAssetBatches = 1;
var counter = 0;

assetManager.symbolTextures;
assetManager.symbolAnims;
assetManager.uiAssets;

assetManager.loadAssets = function(data){
    var smbLoader = new assetLoader(data.symbolImages);
    smbLoader.Load(data.settings.symbolTextureAssetPath, symbolsCallback)
}

function symbolsCallback(data){
    assetManager.symbolTextures = data;
    console.log("symbol textures: " + assetManager.symbolTextures);
    checkComplete();
}

function checkComplete(){
    counter++;
    if(totalAssetBatches == counter)
        gameManager.initGame();
}