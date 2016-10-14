var PIXI = require('pixi.js');
var timer = require('pixi-timer');
var slot = require('./slot/slot.js');
var reel = require('./slot/reel.js');
var loader = require('./loader/loader.js');
var reelLine = require('./slot/reelLines');
var gameManager = require('./gameManager.js');

var app = exports;

//only 1 json file will be loaded for game settings
var nrOfTxtToLoad = 1;

//variable names explain themselves
var spinButton;
var lineButton;
var winLineButton;
var lineContainer;
var gameData;

//create renderer and the app.stage
var renderer = PIXI.autoDetectRenderer(800, 600,{transparent: false});
app.stage = new PIXI.Container();

gameManager.start();



//function initializes the game after load is completed. callback by loader.js
app.startGame = function(){

    initUI();
    //start updating game
    update();
}


app.addReelsToStage = function(data){
    console.log("adding reels");
    gameData = data;
    for(var i = 0; i < gameData.settings.numberOfReels; i++){
        app.stage.addChild(gameManager.slot.reelArr[i].tile);
    }
    app.startGame();
}

//updates frame
function update(){
    requestAnimationFrame(update);
    renderer.render(app.stage);
    PIXI.timerManager.update();

    //spins reel if triggerred. triggering is made by isSpinning flag of each reel, coming from reel.js
    if(gameData!=null){
        for(var i = 0; i < gameData.settings.numberOfReels; i++){
            renderer.render(gameManager.slot.reelArr[i].cont, gameManager.slot.reelArr[i].rendText);
            if(gameManager.slot.reelArr[i].isSpinning){
                gameManager.slot.reelArr[i].spinReel(gameData.settings.totalLength);
            }
        }
    }
}

function initUI(){
    lineContainer = new PIXI.Container;

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
    
    //needs to be added to the app.stage after reels in order to be on the top layer
    app.stage.addChild(lineContainer);

    /**********place the game on the center of the screen**********/
    renderer.view.style.position = 'absolute';
    renderer.view.style.left = '50%';
    renderer.view.style.top = '50%';
    renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';
    /**************************************************************/

    //append renderer viewport to gamediv on html file
    var gameDiv = document.getElementById('gameDiv');
    gameDiv.appendChild(renderer.view);

}