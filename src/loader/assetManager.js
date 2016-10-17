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

var totalAssetBatches = 3;
var counter = 0;

assetManager.symbolTextures;
assetManager.symbolAnims;
assetManager.uiAssets;
assetManager.animAssets;

assetManager.loadAssets = function(data){
    var smbLoader = new assetLoader(data.symbolImages);
    smbLoader.Load(data.settings.symbolTextureAssetPath, symbolsCallback)

    var uiLoader = new assetLoader(data.uiImages);
    uiLoader.Load(data.settings.uiAssetsPath, uiCallBack);

    var animLoader = new assetLoader(data.animations);
    animLoader.Load(data.settings.animAssetPath, animCallback);
    
}

function symbolsCallback(data){
    assetManager.symbolTextures = data;
    checkComplete();
}

function checkComplete(){
    counter++;
    if(totalAssetBatches == counter)
        gameManager.initGame();
}


function uiCallBack(data){
    assetManager.uiAssets = data;
    checkComplete();
}

function animCallback(data){
    assetManager.animAssets = data;
    console.log("anim data: " + data);
    console.log("current anim data: " + data.resources['win07']);
    console.log("assets are: " + assetManager.uiAssets.resources['frame'].texture);
    checkComplete();
}