var slot = exports;

var server = require('./../serverSimulator/serverSim.js');


slot.logit = function(){
    console.log(server.randomizeSpin());
}

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
    slot.reelData = server.randomizeReels(100);
    console.log("reel data: " + slot.reelData[0]);
    slot.gameData = data;
    console.log("game data: " + slot.gameData.settings.totalLength);
}

//reset textures

//spin

//stop

//animate reel lines

//check if spins are done

//check if reel line animations are done