var server = exports;

server.name = "game server";

server.noOfReels = 5;
server.reelSize = 100;
server.reels = new Array();
server.spinData = new Array();
server.numberOfSymbolAssets = 9;

server.randomizeSpin = function (){
    server.spinData = new Array();
    console.log('Generating spin data');
    for(var i = 0; i < server.noOfReels; i++){
        server.spinData.push(Math.floor((Math.random() * (server.reelSize)) + 0));
    }
    console.log("new spin indexes: " + server.spinData[0] + " " + server.spinData[1] + " " + server.spinData[2] + " " + server.spinData[3] + " " + server.spinData[4] + " ")
    return server.spinData;
}

server.randomizeReels = function (rSize){
    console.log('Generating reel data');
    reels = new Array();
    for(var i = 0; i < server.noOfReels; i++){
        var rl =new Array();
        for(var j = 0; j < rSize; j++){
            rl.push(Math.floor((Math.random() * (server.numberOfSymbolAssets)) + 0));
        }
        server.reels.push(rl);
    }
    return server.reels;
}