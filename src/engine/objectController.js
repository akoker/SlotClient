var objectManager = exports;

objectManager.start = function(){
    console.log("object manager started");
}
 
objectManager.createObject = function(args){
    switch (args.type) {
        case background:
            createBackgroundObject(args);
            break;
    
        default:
            break;
    }
}

function createBackgroundObject(args){
    console.log("creating background object named: " + args.name);
}

function createButtonObject(args){
    console.log("creating button object");
}

function createContainerObject(args){
    console.log("creating container object");
}
