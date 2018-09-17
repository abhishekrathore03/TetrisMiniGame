export let Common = {
    /**
     * A small util function to verify if the provided object is defined or not
     */
    isUndefined: function (...arg) {
        let allIsUndefined: boolean = true;

        Array.prototype.forEach.call(arguments, function (variable) {
            if (!allIsUndefined)
                return false;

            allIsUndefined = (typeof variable === 'undefined');
        });

        return allIsUndefined;
    },
    /**
     * Blocks data to be used for creating a Tetromios using tile class
     * width: Width of a tile image in px
     * height: Height of a tile image in px
     * Background: path of Game Background tile
     * blocks: path to diffrent game tiles
     */
    blocks_data: {
        width: 16,
        height: 16,
        background: './res/background.png',
        blocks: {
            block_blue: './res/block_blue.png',
            block_cyan: './res/block_cyan.png',
            block_green: './res/block_green.png',
            block_orange: './res/block_orange.png',
            block_purple: './res/block_purple.png',
            block_red: './res/block_red.png',
            block_yellow: './res/block_yellow.png'
        }
    },
    /**
     * Small util functrion to bind events
     */
    bind: function (element, type, callback) {
        if (element.attachEvent)
            element.attachEvent('on' + type, callback);
        else
            element.addEventListener(type, callback);
    }
};