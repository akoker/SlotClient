var PIXI = require('pixi.js');

module.exports = function(args){
    var callbackFunc;

    var loader = PIXI.loader;
    var counter = 0;

    this.Load = function(prefix, callback){
        callbackFunc = callback;
        for(var i = 0; i < args.length; i++){
            loader.add(args[i].name, prefix + args[i].texture);
            loader.once('complete', onAssetsLoaded);
            loader.load();
        }
    }

    function onAssetsLoaded(){
        counter++;
        if(counter == args.length)
            callbackFunc(loader);
    }
    return this;
}