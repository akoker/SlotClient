var game = require('./../slot/slot.js');

var assetLoader = exports;
var symbolPath = './assets/symbols/textures/'

var loader = new PIXI.loaders.Loader();

loader.add('bunny',"data/bunny.png");

loader.once('complete',onAssetsLoaded);

loader.load();

assetLoader.loadAssets = function(pathPrefix, assetData){
    for(var i = 0; i < assetArr.length;i++){
        loader.add(assetData.ID, pathPrefix + assetData.texture);
    }
}

var onAssetsLoaded = function(){
    //init game when assets completed loading
    game.initSlot();
}