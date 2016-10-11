module.exports = function (data){
    //public variables
    this.numOfSymbols = 7;
    var symbolWidth;
    var symbolHeight = 128;
    var iterations = 10;
    var symbolPath;
    this.isSpinning = false;
    this.spinSpeed = 16;

    //reelcontainer
    this.cont = new PIXI.Container();

    //symbol array for the reel
    var reelData;

    var brt = new PIXI.BaseRenderTexture(symbolWidth, this.numOfSymbols * symbolHeight, PIXI.SCALE_MODES.LINEAR, 1);

    //render texture for the reel. it will be used inside update function to render
    //the tiling image
    this.rendText = new PIXI.RenderTexture(brt);

    //tiling sprite for masking and spin animation
    this.tile = new PIXI.extras.TilingSprite(this.rendText, 128, 384);

    //init reel
    this.createReel = function(target, textureArr){
        for(var i = 1; i<this.numOfSymbols+1; i++){
            //console.log('doing it');
            var s = PIXI.Sprite.fromImage('./../../assets/symbols/textures/' + i + '.jpg')
            s.position.y = (i-1)*128;
            this.cont.addChild(s);
        }
    }

    //replace symbols of the reel according to new spin data
    this.replaceTexture = function(target, textureArr){    
        this.cont.removeChildren();
        for(var i = 0; i<numOfSymbols; i++){
            var s = PIXI.Sprite.fromImage(symbolPath + reelData[target + i] + '.jpg'/*'./assets/symbols/textures/' + i + '.jpg'*/)
            s.position.y = (i-1)*128;
            this.cont.addChild(s);
        }
        return this.cont;
    }

    this.startSpin = function(){
        this.tile.tilePosition.y = 0;
        this.isSpinning = true;
    }

    //spin reel
    this.spinReel = function(target){
        if(this.tile.tilePosition.y < iterations * symbolHeight*this.numOfSymbols)
            this.tile.tilePosition.y += this.spinSpeed;
    }

    //stop reel
    this.stopReel = function(target){

    }
    console.log("reached here");
    return this;
}

