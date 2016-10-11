var PIXI = require('pixi.js');
var slot = require('./slot/slot.js');
var reel = require('./slot/reel.js');

slot.logit();
//console.log(reel.numOfSymbols);

var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var cont = new PIXI.Container();
var cont2 = new PIXI.Container();

var symb = PIXI.Texture.fromImage('./assets/symbols/textures/1.jpg');

for(var i = 1; i<5; i++){
    var s = PIXI.Sprite.fromImage('./assets/symbols/textures/' + i + '.jpg')
    s.position.y = (i-1)*128;
    cont.addChild(s);
}


var brt = new PIXI.BaseRenderTexture(128, 512, PIXI.SCALE_MODES.LINEAR, 1);

var rt = new PIXI.RenderTexture(brt);

var tile = new PIXI.extras.TilingSprite(rt, 128, 384);

//sprite.x = 0;
//sprite.y = 0;
stage.addChild(tile);

cont.x = 0;
cont.y = 0;

tile.position.x = 100;
tile.position.y = 60;
var inc = 2;
var isChanged = false;
update();

function update(){
    renderer.render(cont, rt);
    if(inc < 32)
        inc+=0.2;
    if(tile.tilePosition.y > 6000){
        console.log("supposed to change");
        cont.removeChildren();
        for(var i = 1; i<5; i++){
            var s = PIXI.Sprite.fromImage('./assets/symbols/textures/' + (i+4) + '.jpg')
            s.position.y = (i-1)*128;
            cont.addChild(s);
        }
        isChanged = true;
    }
    if(tile.tilePosition.y < 9500){
        tile.tilePosition.y += inc;
    }
    else if(tile.tilePosition.y < 12288){
        if(inc>4)
            inc-=0.4;
        tile.tilePosition.y +=inc;
    }
    else if(12288 - tile.tilePosition.y < inc){
        tile.tilePosition.y = 12288;
    }
    
    //console.log(tile.tilePosition.y);
    requestAnimationFrame(update);
    renderer.render(stage);
}