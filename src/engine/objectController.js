var objectManager = exports;

var gameManager = require('./../gameManager.js');
var slot = require('./../slot/slot.js');
var reelLines = require('./../slot/reelLines.js');
var PIXI = require('pixi.js');
var animController = require('./animationController.js');

objectManager.start = function(){
    console.log("object manager started");
}

 
objectManager.createObject = function(args){
    switch (args.type) {
        case "object":
            return createGameObject(args);
        case "slotGame":
            return createSlotGameObject(args);
        case "text":
            return createTextObject(args);
        default:
            break;
    }
}

function createGameObject (args){
    var s;
    if(args.asset!=null){
        var source = gameManager.assetManager.uiAssets.resources[args.asset];
        if(source != undefined){
            s = new PIXI.Sprite(source.texture);
        }
        else{
            s = new PIXI.Graphics();
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
        args.x == null ? s.position.x = 0 : s.position.x = args.x;
        args.y == null ? s.position.y = 0 : s.position.y = args.y;
        args.visible == null ? s.visible = true : s.visible = args.visible;
        s.interactive = true;
    }
    return s;
}

function createTextObject(args){
    var fFamily;
    args.props.fontFamily == null ? fFamily = 'Arial' : fFamily = args.props.fontFamily;
    var fSize;
    args.props.fontSize == null ? fSize = 20 : fSize = args.props.fontSize;
    var fFill;
    args.props.fill == null ? fFill = 0xffffff : fFill = args.props.fill;
    var fAlign;
    args.props.align == null ? fAlign = 'left' : fAlign = args.props.align;
    var text = new PIXI.Text(args.content,{fontFamily : fFamily, fontSize: fSize, fill : fFill, align : fAlign});
    text.name = args.name;
    args.x == null ? text.position.x = 0 : text.position.x = args.x;
    args.y == null ? text.position.y = 0 : text.position.y = args.y;
    args.visible == null ? text.visible = true : text.visible = args.visible;
    return text;
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

dynFuncs.setObjectProperty = function(args){
    var obj = gameManager.getObjectByName(args[0].target, gameManager.objects);
    var prop = args[0].propName;
    var val = args[0].propValue;
    obj[prop] = val;
};