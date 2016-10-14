var assetManager = exports;



assetManager.getSymbolTextures = function(gameData){
    var symTPath = gameData.settings.symbolTextureAssetPath;
    console.log("loading symbol textures");
    var symbolTextures = new Array();
    for(var i = 0; i < gameData.symbolImages.length;i++){
        var t = symTPath + gameData.symbolImages[i].texture;
        symbolTextures.push(PIXI.Texture.fromImage(t));
    }
    return symbolTextures;
}