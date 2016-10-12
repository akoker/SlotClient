var PIXI = require('pixi.js');
var slot = require('./slot/slot.js');
var reel = require('./slot/reel.js');
var loader = require('./loader/loader.js');
var reelLine = require('./slot/reelLines');

var app = exports;

//only 1 json file will be loaded for game settings
var nrOfTxtToLoad = 1;

//variable names explain themselves
var spinButton;
var lineButton;
var winLineButton;
var lineContainer;
var gameData;

//create renderer and the stage
var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});

/**********place the game on the center of the screen**********/
renderer.view.style.position = 'absolute';
renderer.view.style.left = '50%';
renderer.view.style.top = '50%';
renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';
/**************************************************************/

var stage = new PIXI.Container();

//append renderer viewport to gamediv on html file
var gameDiv = document.getElementById('gameDiv');
gameDiv.appendChild(renderer.view);

//start loader
loader.startLoader(nrOfTxtToLoad);

//function initializes the game after load is completed. callback by loader.js
app.startGame = function(data){
    lineContainer = new PIXI.Container;
    gameData = data;

    //spin button and its handler are created
    spinButton = document.getElementById('spinButton');
    spinButton.onclick = function(){
        lineContainer.removeChildren();
        slot.startSpin();
    } 

    //drawLine button and its handler are created
    lineButton = document.getElementById('lineButton');
    lineButton.onclick = function(){
        lineContainer.removeChildren();
        console.log("lineButton is clicked");
        lineContainer.addChild(reelLine.drawLine());
    }   

    //drawWinningLine button and its handler are created
    winLineButton = document.getElementById('winLineButton');
    winLineButton.onclick = function(){
        lineContainer.removeChildren();
        console.log("winLineButton is clicked");
        lineContainer.addChild(reelLine.drawWinningLine());
    }

    //initialize slot game
    slot.initSlot(gameData);

    //add tiling sprites of the reels to the stage after initialization
    for(var i = 0; i < gameData.settings.numberOfReels; i++){
        stage.addChild(slot.reelArr[i].tile);
    }


    //needs to be added to the stage after reels in order to be on the top layer
    stage.addChild(lineContainer);

    //start updating game
    update();
}

//updates frame
function update(){
    requestAnimationFrame(update);
    renderer.render(stage);

    //spins reel if triggerred. triggering is made by isSpinning flag of each reel, coming from reel.js
    for(var i = 0; i < gameData.settings.numberOfReels; i++){
        renderer.render(slot.reelArr[i].cont, slot.reelArr[i].rendText);
        if(slot.reelArr[i].isSpinning){
            slot.reelArr[i].spinReel(gameData.settings.totalLength);
        }
    }
}