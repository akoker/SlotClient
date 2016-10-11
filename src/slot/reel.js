//for public scoping
var reel = exports;

//public variables
reel.numOfSymbols = 20;
reel.symbolWidth;
reel.symbolPath;

//reelcontainer
reel.cont = new PIXI.Container();

//symbol array for the reel
reel.reelData;

var brt = new PIXI.BaseRenderTexture(128, 512, PIXI.SCALE_MODES.LINEAR, 1);

//render texture for the reel. it will be used inside update function to render
//the tiling image
reel.rendText = new PIXI.RenderTexture(brt);

//tiling sprite for masking and spin animation
reel.tile = new PIXI.extras.TilingSprite(reel.rendText, 128, 384);

//init reel
reel.createReel = function(target, textureArr){
    for(var i = 0; i<numOfSymbols; i++){
        var s = PIXI.Sprite.fromImage('./assets/symbols/textures/' + i + '.jpg')
        s.position.y = (i-1)*128;
        cont.addChild(s);
    }
    return reel.cont;
}

//replace symbols of the reel according to new spin data
reel.replaceTexture = function(target, textureArr){    
    reel.cont.removeChildren();
    for(var i = 0; i<numOfSymbols; i++){
        var s = PIXI.Sprite.fromImage(symbolPath + reelData[target + i] + '.jpg'/*'./assets/symbols/textures/' + i + '.jpg'*/)
        s.position.y = (i-1)*128;
        cont.addChild(s);
    }
    return reel.cont;
}

//spin reel
reel.spinReel = function(target){

}

//stop reel
reel.stopReel = function(target){

}