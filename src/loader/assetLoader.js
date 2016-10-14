var PIXI = require('pixi.js');

module.exports = function(args){
    var callbackFunc;

    this.loader = PIXI.loader;
    var counter = 0;

    this.startLoading = function(args, callback){
        for(var i = 0; i < args.length; i++){
            loader.add(args[i].name, args[i].path);
            loader.once('complete', onAssetsLoaded(args.length, callback));
            loader.load();
        }
    }

    function onAssetsLoaded(callback){
        counter++;
        if(counter == args.length)
            callback(assets);
    }
    return this;
}