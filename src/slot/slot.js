var slot = exports;

var server = require('./../serverSimulator/serverSim.js');
var reel = require('./reel.js');



slot.reelArr = new Array();//array of reel containers
slot.symbolTextures = new Array();
slot.gameData;
slot.reelData;
slot.spinData;




//functions:
//init slot
    //get initialized slot data
    //create reels *start with single one
slot.initSlot = function(data){
    //set game data
    slot.gameData = data;
    console.log("game data: " + slot.gameData.settings.totalLength);

    //get reelData from simulated server
    slot.reelData = server.randomizeReels(100);
    console.log("reel data: " + slot.reelData[0]);

    //get randomized spin data to randomize initial reel position
    slot.spinData = server.randomizeSpin();

    //create reels
    //reel.cont = reel.createReel();
    //slot.reelArr.push(reel.cont);
    var r = new reel(slot.reelData[0]);
    r.createReel(10,10);
    slot.reelArr.push(r);
    console.log("number of symbols: " + slot.reelArr[0].numOfSymbols);
}

//reset textures

//spin

//stop

//animate reel lines

//check if spins are done

//check if reel line animations are done