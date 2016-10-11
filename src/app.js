var PIXI = require('pixi.js');
var slot = require('./slot/slot.js');
var reel = require('./slot/reel.js');
var loader = require('./loader/loader.js');
var app = exports;


//console.log(reel.numOfSymbols);
var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
var stage = new PIXI.Container();

document.body.appendChild(renderer.view);

loader.startLoader(1);

app.startGame = function(data){
    
    slot.initSlot(data);
    stage.addChild(slot.reelArr[0].tile);
    slot.reelArr[0].startSpin();
    update();
}

function update(){
    renderer.render(slot.reelArr[0].cont, slot.reelArr[0].rendText);
    requestAnimationFrame(update);
    renderer.render(stage);
    if(slot.reelArr[0].isSpinning){
        slot.reelArr[0].spinReel(20);
    }
}