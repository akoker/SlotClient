var app = require('./../app.js');

module.exports = function (data){
    //public variables
    this.numOfSymbols = 20;
    var symbolWidth = 128;
    var symbolHeight = 128;
    var iterations = 4;
    var symbolPath;
    var gameData;
    this.isSpinning = false;
    this.spinSpeed = 14;
    this.maxSpeed = 40;
    var spinInc = this.spinSpeed;
    this.textureArr;
    this.textureChanged = false;
    this.index;

    //reelcontainer
    this.cont = new PIXI.Container();

    //symbol array for the reel
    var reelData;

    var brt = new PIXI.BaseRenderTexture(symbolWidth, this.numOfSymbols * symbolHeight, PIXI.SCALE_MODES.LINEAR, 1);

    //render texture for the reel. it will be used inside update function to render
    //the tiling image
    this.rendText = new PIXI.RenderTexture(brt);

    //tiling sprite for masking and spin animation
    this.tile = new PIXI.extras.TilingSprite(this.rendText, symbolWidth, symbolHeight*3);

    //init reel
    this.createReel = function(target, textureArr, data){
        this.textureArr = textureArr;
        reelData = data;   
        for(var i = 0; i<this.numOfSymbols; i++){
            var s = new PIXI.Sprite(this.textureArr[reelData[normalizeIndexNumber(target+i, reelData.length)]]);
            s.position.y = (i)*symbolHeight;
            this.cont.addChild(s);
        }
    }

    //replace symbols of the reel according to new spin data
    this.replaceTexture = function(target){
        this.cont.removeChildren();
        for(var i = 0; i<this.numOfSymbols; i++){
            var s = new PIXI.Sprite(this.textureArr[reelData[normalizeIndexNumber(target+i, reelData.length)]]);
            s.position.y = (i)*symbolHeight;
            this.cont.addChild(s);
        }
        this.textureChanged = true;
        return this.cont;
    }

    this.startSpin = function(target){
        spinInc = this.spinSpeed;
        this.tile.tilePosition.y = 0;
        this.isSpinning = true;
        this.textureChanged = false;
        this.currentTarget = target;
    }

    //spin reel
    this.spinReel = function(){
        //before upper speed limit, speed up spin
        if(this.tile.tilePosition.y < (iterations*symbolHeight*this.numOfSymbols)*0.6 && spinInc < this.maxSpeed){
                spinInc+=0.1;
            }
        //while on top speed, replace textures according to the target
        else if(this.tile.tilePosition.y > (iterations*symbolHeight*this.numOfSymbols)*0.6 && this.tile.tilePosition.y < (iterations*symbolHeight*this.numOfSymbols)*0.8){
            if(!this.textureChanged){
                console.log("texture was changed");
                this.cont = this.replaceTexture(this.currentTarget);
            }
        }
        //speed down for last %20 of spin
        else if(this.tile.tilePosition.y > (iterations*symbolHeight*this.numOfSymbols)*0.8 && spinInc > this.spinSpeed){
            spinInc-=0.35;
        }
        //spin the reel by increment tile position
        if(this.tile.tilePosition.y < iterations * symbolHeight*this.numOfSymbols)
            this.tile.tilePosition.y += spinInc;
        //if increment variable messes up, place the reel into its targeted position
        else if(this.tile.tilePosition.y > iterations*symbolHeight*this.numOfSymbols){
            this.tile.tilePosition.y = iterations*symbolHeight*this.numOfSymbols;
            this.isSpinning = false;
        }
    }

    //stop reel
    this.stopReel = function(target){
        if(!this.textureChanged)
            this.cont = this.replaceTexture(target);
        this.tile.tilePosition.y = 0;
        this.isSpinning = false;
    }
    return this;
}

function normalizeIndexNumber(ind, arraySize){
    if(ind < 0){
        return Math.abs(arraySize + ind);
    }
    if(ind >= arraySize){
        return Math.abs(arraySize - ind);
    }else
        return ind;
    //return (arraySize - ind) < 0 ? Math.abs(arraySize-ind + 1) : ind;
}