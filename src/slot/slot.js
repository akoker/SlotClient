var slot = exports;

var PIXI = require('pixi.js');
var server = require('./../serverSimulator/serverSim.js');
var reel = require('./reel.js');
var reelGap;
var symbolWidth;
var symbolHeight;
var slotXPos;
var slotYPos;
var numberOfReels;
var reelItemSize;

slot.reelArr = new Array();//array of reel containers
slot.symbolTextures;
slot.gameData;
slot.reelData;
slot.spinData;
slot.gameManager;
slot.assetData;


function setVarValues(){
    symbolWidth = slot.gameData.symbolProps.symbolWidth;
    symbolHeight = slot.gameData.symbolProps.symbolHeight;
    reelGap = slot.gameData.settings.reelGap;
    slotXPos = slot.gameData.settings.slotXPos;
    slotYPos = slot.gameData.settings.slotYPos;
    numberOfReels = slot.gameData.settings.numberOfReels;
    reelItemSize = slot.gameData.settings.reelItemSize;
}


//init slot
slot.initSlot = function(gData, aData){
    //set game data
    slot.gameData = gData;
    slot.assetData = aData;
    setVarValues();

    //get reelData from simulated server
    slot.reelData = server.randomizeReels(reelItemSize);


    //get randomized spin data to randomize initial reel position
    slot.spinData = server.randomizeSpin();
    
    //you can trace it on the console if the spin stops on correct position or not. this is for initial reels.
    console.log("spin is initiated, spin order: " + slot.reelData[0][slot.spinData[0]] + " " + slot.reelData[1][slot.spinData[1]] + " " + slot.reelData[2][slot.spinData[2]] + " " + slot.reelData[3][slot.spinData[3]] + " " + slot.reelData[4][slot.spinData[4]] + " ")
      

    //create reels
    for(var i = 0; i < numberOfReels; i++){

        var r = new reel(slot.reelData[i], slot.gameData, slot.assetData);
        r.createReel(slot.spinData[i], slot.gameManager.assetManager.symbolTextures, slot.reelData[i]);
        
        
        //set reel Positions
        r.tile.position.x = slotXPos + (symbolWidth+reelGap) * i;
        r.tile.position.y = slotYPos;

        //push reels into reel array
        slot.reelArr.push(r);
    }
      
}

slot.startSpin = function(){
    //if last reel is not spinning, then none of them are. In this example, they spin synchronously so order is not important.
    //if slot is not spinning and pressed spin button, get new spin data from server simulator
    
    if(!slot.reelArr[slot.gameData.settings.numberOfReels-1].isSpinning)
        slot.spinData = server.randomizeSpin();

    //you can trace it on the console if the spin stops on correct position or not. result of every spin will be show on the console.
    //you can check if visuals are correct by looking at the assets folder
    console.log("spin is initiated, spin order: " + slot.reelData[0][slot.spinData[0]] + " " + slot.reelData[1][slot.spinData[1]] + " " + slot.reelData[2][slot.spinData[2]] + " " + slot.reelData[3][slot.spinData[3]] + " " + slot.reelData[4][slot.spinData[4]] + " ")
    
    //if not spinning, start spinning each reel, if spinning, stop them and set the final position
    for(var i = 0; i < 5; i++){
        if(!slot.reelArr[i].isSpinning){

            var t = PIXI.timerManager.createTimer(400 * i + 0.1);
            t.start()
            t.index = i;
            t.on('end', function(){
                slot.reelArr[this.index].startSpin(slot.spinData[this.index]);
            });
        }
        else
            slot.reelArr[i].stopReel(slot.spinData[i]);
    }
}