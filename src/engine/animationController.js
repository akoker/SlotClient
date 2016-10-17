var animationController = exports;
var assetManager = require('./../loader/assetManager.js');
var slot = require('./../slot/slot.js');


animationController.playAnimation = function(animName, animLength, i,j){

    var animArr = slot.gameManager.assetManager.animAssets;

    var textureArray = [];
    
    for (var k=1; k < animLength+1; k++)
    {
        if(k < 10) n = animName + '0';
        else n = animName;

        n = n + k;
        textureArray.push(animArr.resources[n].texture);
    };

    var mc = new PIXI.MovieClip(textureArray);

    mc.position.x = slot.gameData.settings.slotXPos + i*(slot.gameData.symbolProps.symbolWidth + slot.gameData.settings.reelGap);
    mc.position.y = slot.gameData.settings.slotYPos + j*slot.gameData.symbolProps.symbolHeight;

    mc.play();

    return mc;
}

animationController.stopAnimation = function(animObj){
    animObj.stop();
}



