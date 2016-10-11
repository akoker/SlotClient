var assets;

var symbolTextures;

var symTPath;;

function setSymbolTextures(callback){
    symTPath = gameData.settings.symbolTextureAssetPath;
    console.log("loading symbol textures");
    symbolTextures = new Array();
    for(var i = 0; i < gameData.symbolImages.length;i++){
        var t = root + symTPath + gameData.symbolImages[i].texture;
        symbolTextures.push(PIXI.Sprite.fromImage(t));
    }
    startGame();
}