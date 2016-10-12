var PIXI = require('pixi.js');
var reelLines = exports;

//data variables are hardcoded because this class is only for showcasing its functionality. it can easily be turned into completely dynamical.
//drawing functions run dynamically
var p = [2,1,1,2,0];
var pArgs = new Object();
pArgs.leftPos = 60;
pArgs.rightPos = 740;
pArgs.topMargin = 100;
pArgs.symbolWidth = 128;
pArgs.symbolHeight = 128;
pArgs.reelMargin = 10;
pArgs.numberOfReels = 5;

//draw only possible line
reelLines.drawLine = function (){
    randomizeReelLines();
    console.log("drawing line");
    var g = new PIXI.Graphics();
    g.lineStyle(4, 0xffd900, 1);
    g.moveTo(pArgs.leftPos - 20, p[0]*pArgs.symbolHeight + pArgs.topMargin + pArgs.symbolHeight/2);
    for(var i = 0; i < 5; i++){
        g.lineTo(pArgs.leftPos + pArgs.reelMargin*i + i*pArgs.symbolWidth + pArgs.symbolWidth/2, pArgs.topMargin + pArgs.symbolHeight*p[i] + pArgs.symbolHeight/2);
        g.moveTo(pArgs.leftPos + pArgs.reelMargin*i + i*pArgs.symbolWidth + pArgs.symbolWidth/2, pArgs.topMargin + pArgs.symbolHeight*p[i] + pArgs.symbolHeight/2);
    }
    g.endFill();
    return g;
}

//draws winning line with squares
reelLines.drawWinningLine = function (){
    randomizeReelLines();
    console.log("drawing winning line");
    var g = new PIXI.Graphics();
    g.lineStyle(4, 0xaad900, 1);
    
    g.moveTo(pArgs.leftPos -20, p[0]*pArgs.symbolHeight + pArgs.topMargin + pArgs.symbolHeight/2);

    for(var i = 0; i < 5; i++){
        g.lineTo(pArgs.leftPos + i*pArgs.symbolWidth + i*pArgs.reelMargin, p[i]*pArgs.symbolHeight + pArgs.topMargin + pArgs.symbolHeight/2);
        g.moveTo(pArgs.leftPos + (i+1)*pArgs.symbolWidth + i*pArgs.reelMargin, p[i]*pArgs.symbolHeight + pArgs.topMargin + pArgs.symbolHeight/2);

    }
    for(var i = 0; i < 5; i++){
        g.drawRect(pArgs.leftPos + i*pArgs.symbolWidth + i*pArgs.reelMargin, p[i]*pArgs.symbolHeight + pArgs.topMargin, pArgs.symbolWidth, pArgs.symbolHeight);
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