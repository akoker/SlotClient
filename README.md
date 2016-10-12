Simple Slot Game Client
=====================

This game client uses Pixi.js as renderer and browserify for code organization as dependencies. For dev-dependencies, beefy is used for localhost usage and watchify for compiling the code without running
browserify every time.



[slot-client]: https://github.com/alicanKoker/SlotClient

## Demo

after completing the npm setup, beefy and browserify(watchify) can be used with two seperate command lines as follows;

* for watchify:
- npm run watch

* for beefy:
- beefy index.HTML

* beefy runs on localhost:9966

## How It Works?

index.html file runs bundle.js compiled by browserify. The main file of the project is app.js

client flows as follows;

- app.js:

    - creates renderer and stage
    - starts loader

- loader.js
    
    - loads json file for settings
    - returns and calls back startGame function from app.js

- app.js

    - does button eventlistener bindings
    - calls slot class to create reels

- slot.js

    - calls reel class to initialize reels

- reel.js

    - this is where magic happens;
    /*******************************************************************************************************/

    * Reel Logic:
        - Reels may contain up to more than hundred symbols on one strip. On each spin, a randomized index
        number is generated for each reel and reach reel stops at the generated index. according to matched
        lines, winnings are calculated.
        
        - For computer graphics, creating an image containing 100+ smybols on single strip will cause
        performance problems mostly related to memory usage and rendering(depending on masking, etc...)
        
        - What this client does, cropping n number of symbols starting from target index, creates a smaller
        sprite(tilingSprite), tilingSprite automatically masks the image. And for spinning action, increments
        y tilePosition of the tilingSprite.

    * How does symbol textures refresh on each new spin?

        - Each spin have their own speed parabolas. When spin speed is on its pike, all of the symbol images
        on the reel container is switched with new ones according to the new spin data, again starting from
        the target index.
        
        - Each sping stops at the initial point after making n number of complete spins so that position calculation
        for stopping position is avoided. -less CPU usage-

    * On the current settings, there are only 20 symbols are used on each reel. This settings can be change. For
        the best user experience, at least 20 is better. Otherwise players would sense texture swap with a shorter
        reel strip.
    /*******************************************************************************************************/

- reelLines.js

    * There aren't proper line buttons on the game. Instead, there are two buttons that can trigger a line and a
    winning line. While plain line is only drawn aiming pivot points of the targeted symbol on the each column, 
    winnin lines also draw squares around every symbol on the winning line.

- serverSimulator.js

    * A simple file simulating server data in terms of random data creation.

- slotGame.json

    * Data file contains all necessary settings


## License

CC0 (public domain)
