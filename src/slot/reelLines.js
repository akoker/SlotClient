var PIXI = require('pixi.js');
var reelLines = exports;
var gameManager = require('./../gameManager.js');

//data variables are hardcoded because this class is only for showcasing its functionality. it can easily be turned into completely dynamical.
//drawing functions run dynamically
var p = [
    [2,2,1,2,2],
    [0,0,1,0,0],
    [1,2,2,2,1],
    [2,1,1,1,2],
    [0,0,0,0,0],
    [1,1,1,1,1],
    [2,2,2,2,2],
    [2,1,0,1,2],
    [0,1,2,1,0]
]
//var p = [2,1,1,2,0];
var pArgs = new Object();
pArgs.leftPos = 260;
pArgs.rightPos = 740;
pArgs.topMargin = 124;
pArgs.symbolWidth = 144;
pArgs.symbolHeight = 144;
pArgs.reelMargin = 10;
pArgs.numberOfReels = 5;
pArgs.numberOfLines = 9;

//draw only possible line
reelLines.drawLine = function (index){
    console.log("drawing line");
    var g = new PIXI.Graphics();
    g.lineStyle(4, 0xffd900, 1);
    var btnCont = gameManager.getObjectByName("lineButtonContainer", gameManager.objects);
    var name = "lineButton" + (index + 1);
    var sP = gameManager.getObjectByName(name, gameManager.objects);
    g.moveTo(btnCont.x + sP.position.x + 50, btnCont.y + sP.position.y + 25);
    for(var i = 0; i < pArgs.numberOfReels; i++){
        g.lineTo(pArgs.leftPos + pArgs.reelMargin*i + i*pArgs.symbolWidth + pArgs.symbolWidth/2, pArgs.topMargin + pArgs.symbolHeight*p[index][i] + pArgs.symbolHeight/2);
        g.moveTo(pArgs.leftPos + pArgs.reelMargin*i + i*pArgs.symbolWidth + pArgs.symbolWidth/2, pArgs.topMargin + pArgs.symbolHeight*p[index][i] + pArgs.symbolHeight/2);
    }
    //disabled other buttons
    for(var j = 0; j < pArgs.numberOfLines; j++){
        console.log("changing buttons");
        var name = "lineButton" + (j + 1);
        var s = gameManager.getObjectByName(name, gameManager.objects);
        if(j!=(index)){
            var tx = (gameManager.assetManager.uiAssets.resources["lineBtn" + (j + 1) + "Passive"]);
            s.texture =tx.texture;
        }else{
            var tx = (gameManager.assetManager.uiAssets.resources["lineBtn" + (j + 1)]);
            s.texture = tx.texture;
        }
    }
    g.endFill();
    return g;
}

//draws winning line with squares
reelLines.drawWinningLine = function (index){
    randomizeReelLines();
    console.log("drawing winning line");
    var g = new PIXI.Graphics();
    g.lineStyle(4, 0xaad900, 1);
    
    g.moveTo(pArgs.leftPos -20, p[0]*pArgs.symbolHeight + pArgs.topMargin + pArgs.symbolHeight/2);

    for(var i = 0; i < 5; i++){
        g.lineTo(pArgs.leftPos + i*pArgs.symbolWidth + i*pArgs.reelMargin, p[index][i]*pArgs.symbolHeight + pArgs.topMargin + pArgs.symbolHeight/2);
        g.moveTo(pArgs.leftPos + (i+1)*pArgs.symbolWidth + i*pArgs.reelMargin, p[index][i]*pArgs.symbolHeight + pArgs.topMargin + pArgs.symbolHeight/2);

    }
    for(var i = 0; i < 5; i++){
        g.drawRect(pArgs.leftPos + i*pArgs.symbolWidth + i*pArgs.reelMargin, p[index][i]*pArgs.symbolHeight + pArgs.topMargin, pArgs.symbolWidth, pArgs.symbolHeight);
    }
    g.endFill();
    return g;
}

//randomizes reel line data so that you can see it works on all conditions
function randomizeReelLines(){
    for(var i = 0; i < pArgs.numberOfReels; i++){
        p[i] = Math.floor((Math.random() * 3) + 0)
    }
    console.log("winning line: " + p[0] + " " + p[1] + " " + p[2] + " " + p[3] + " " + p[4]);
}