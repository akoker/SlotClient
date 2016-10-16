var objectManager = exports;

var gameManager = require('./../gameManager.js');
var slot = require('./../slot/slot.js');
var reelLines = require('./../slot/reelLines.js');
var PIXI = require('pixi.js');

objectManager.start = function(){
    console.log("object manager started");
}
 
objectManager.createObject = function(args){
    switch (args.type) {
        case "object":
            return createGameObject(args);
        case "container":
            //createContainerObject(args);
            break;
        case "button":
            createButtonObject(args);
            break;
        case "slotGame":
            return createSlotGameObject(args);
        default:
            break;
    }
    /*if(o!=null)
    {
        if(o.children!=undefined)
        //gameManager.app.addChildToStage(o);
    }*/
}

function createGameObject (args){
    //console.log("creating: " + args.name + " " + args.type);
    var s;
    if(args.asset!=null){
        var source = gameManager.assetManager.uiAssets.resources[args.asset];
        if(source != undefined){
            s = new PIXI.Sprite(source.texture);
        }
        else{
            s = new PIXI.Graphics();
            //args.bgColor = undefined ? s.beginFill() : s.beginFill(args.bgColor);
            s.beginFill();
            s.drawRect(0, 0, args.width = null ? 1 : args.width, args.height = null ? 1 : args.height);
            s.endFill();
        }
        if(args.buttonMode){
            s.buttonMode = true;
            if(args.asset.active != null){
                if(args.buttonState == "active")
                    var tx = (gameManager.assetManager.uiAssets.resources[args.asset.active]);
                else if(args.buttonState == "passive")
                    var tx = (gameManager.assetManager.uiAssets.resources[args.asset.passive]);
                s = new PIXI.Sprite(tx.texture);
            }
            if(args.actions!=undefined){
            if(args.actions.mouseDown != undefined){
                    s.interactive = true;
                    s.mousedown = function(){
                        console.log("clicked to: " + s.name);
                        processProperty(args.actions.mouseDown);
                    }
                }
            }
        }
        s.name = args.name;
        args.x = null ? s.position.x = 0 : s.position.x = args.x;
        args.y = null ? s.position.y = 0 : s.position.y = args.y;
        //if(args.buttonMode == null)args.interactive = null ? s.interactive = false : s.interactive = args.interactive;
        s.interactive = true;
    }
    return s;
}

function createButtonObject(args){
    console.log("creating button object");
}

function createSlotGameObject(args){
    console.log("creating slot game object");
    return gameManager.app.addReelsToStage(slot.gameData);
}

function processProperty(args){
    if(args.length > 0){
        for(var i = 0; i < args.length; i++)
            processProperty(args[i])
    }else{
        if(args.execFunction != null){
            var a = args.execFunction;
            var b = args.execProps;
            dynFuncs[a](b);
            
        }
    }
}

var dynFuncs = [];

dynFuncs.cons = function(){
    console.log("cons is called");
};

dynFuncs.setLines = function(index){
    var lnCont = gameManager.getObjectByName("lineContainer", gameManager.objects);
    lnCont.removeChildren();
    lnCont.addChild(reelLines.drawLine(index));
};

dynFuncs.toggleButtonState = function(args){
    console.log("toggleButtonState is called");
};

dynFuncs.startSpin = function(){
    var lnCont = gameManager.getObjectByName("lineContainer", gameManager.objects);
    lnCont.removeChildren();
    slot.startSpin();
};