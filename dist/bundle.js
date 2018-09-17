/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Common.ts":
/*!***********************!*\
  !*** ./src/Common.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = {
    /**
     * A small util function to verify if the provided object is defined or not
     */
    isUndefined: function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        var allIsUndefined = true;
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


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = __webpack_require__(/*! ./Common */ "./src/Common.ts");
var Tile_1 = __webpack_require__(/*! ./Tile */ "./src/Tile.ts");
var Tetrominos_1 = __webpack_require__(/*! ./Tetrominos */ "./src/Tetrominos.ts");
var Game = /** @class */ (function () {
    function Game(container, renderer, width, height, speed) {
        this.speed = 0;
        this.rightBarWidth = 0;
        this.userMoving = false;
        this.maxBlockByX = 0;
        this.maxBlockByY = 0;
        this.stopMovingActiveFigure = false;
        this.figureRotated = false;
        this.containerWidth = 0;
        this.activeFigureStartPosition = { x: 0, y: 0 };
        this.nextFigureStartPosition = { x: 0, y: 0 };
        this.speed = speed > 4 ? 4 : speed;
        this.rightBarWidth = Common_1.Common.blocks_data.width * 6;
        this.activeFigureStartPosition = { x: 0, y: 0 };
        this.nextFigureStartPosition = { x: 0, y: 0 };
        this.userMoving = false;
        this.step = Math.pow(2, speed) / (2 * Common_1.Common.blocks_data.height);
        this.initialStep = this.step;
        this.stopMovingActiveFigure = false;
        this.figureRotated = false;
        this.self = this;
        this.bindEvents.call(this);
        this.containerWidth = (function (width) {
            var w = width, minWidth = Common_1.Common.blocks_data.width * 5, minCountBlocks = ~~(minWidth / Common_1.Common.blocks_data.width), realBlockHere = ~~(w / Common_1.Common.blocks_data.width);
            realBlockHere = realBlockHere < minCountBlocks ? minCountBlocks : realBlockHere;
            return realBlockHere * Common_1.Common.blocks_data.height;
        })(width) + this.rightBarWidth;
        var containerHeight = (function (height) {
            var h = height, minHeight = Common_1.Common.blocks_data.height * 10, minCountBlocks = ~~(minHeight / Common_1.Common.blocks_data.height), realBlockHere = ~~(h / Common_1.Common.blocks_data.height);
            realBlockHere = realBlockHere < minCountBlocks ? minCountBlocks : realBlockHere;
            return realBlockHere * Common_1.Common.blocks_data.height;
        })(height);
        this.maxBlockByX = (this.containerWidth - this.rightBarWidth) / Common_1.Common.blocks_data.width;
        this.maxBlockByY = containerHeight / Common_1.Common.blocks_data.height;
        var stage = container;
        var gameContainer = new PIXI.DisplayObjectContainer();
        gameContainer.position.x = 0;
        gameContainer.position.y = 0;
        var detailContainer = new PIXI.DisplayObjectContainer();
        detailContainer.position.x = this.containerWidth - this.rightBarWidth;
        detailContainer.position.y = 0;
        detailContainer.width = 200;
        stage.addChild(gameContainer);
        stage.addChild(detailContainer);
        var backgroundTexture = PIXI.Texture.fromImage(Common_1.Common.blocks_data.background);
        for (var _i = 0; _i < this.maxBlockByX; _i++) {
            for (var _y = 0; _y < this.maxBlockByY; _y++) {
                var backgroundBlock = new Tile_1.Tile(function () {
                    return new PIXI.Sprite(backgroundTexture);
                });
                backgroundBlock.setPosition(_i, _y);
                backgroundBlock.addToContainer(gameContainer);
            }
        }
        this.bottomFigures = new PIXI.DisplayObjectContainer();
        gameContainer.addChild(this.bottomFigures);
        var activeFigureMoving = function () {
            var _this = this;
            if (this.userMoving)
                return;
            var self = this;
            if (Common_1.Common.isUndefined(this.activeFigure)) {
                if (!Common_1.Common.isUndefined(this.previousFigure))
                    this.previousFigure.blocks.forEach(function (block) {
                        block.addToContainer(_this.bottomFigures);
                        block.figure.position.x = block.figure.getBounds().x;
                        block.figure.position.y = block.figure.getBounds().y;
                    });
                this.firedLines = this.burnLine.call(this); //burn only if created new figure, not every tick
                if (this.nextFigure)
                    this.activeFigure = this.nextFigure.moveToContainer(gameContainer);
                else
                    this.activeFigure = new Tetrominos_1.Tetrominos(gameContainer);
                this.activeFigureStartPosition = {
                    x: ~~((this.containerWidth - this.rightBarWidth) / Common_1.Common.blocks_data.width / 2),
                    y: -1
                };
                this.step = this.initialStep;
                this.activeFigure.setPosition(this.activeFigureStartPosition);
                this.stopMovingActiveFigure = false;
                //To show the next figure in right side
                this.nextFigure = new Tetrominos_1.Tetrominos(detailContainer);
                this.nextFigureStartPosition = {
                    x: this.rightBarWidth / Common_1.Common.blocks_data.width / 2,
                    y: 2
                };
                this.nextFigure.setPosition(this.nextFigureStartPosition);
            }
            else if (this.figureRotated) {
                if (this.activeFigure.intersectWith(this.bottomFigures))
                    this.activeFigure.rotate(270);
                return this.figureRotated = false;
            }
            if (!this.activeFigure.moveDown(self.step, function () {
                var bounds = this.figure.getBounds(), stopBottom = (bounds.y + bounds.height >= containerHeight);
                return stopBottom || self.activeFigure.intersectWith(self.bottomFigures);
            })) {
                var rcx = this.activeFigure.centerCoords.rcx, rcy = this.activeFigure.centerCoords.rcy, fixDeltaX = rcx - rcx % ~~rcx, fixDeltaY = rcy - rcy % ~~rcy;
                this.activeFigure.setPosition(fixDeltaX, fixDeltaY);
                this.previousFigure = this.activeFigure;
                delete this.activeFigure;
            }
            if (this.bottomFigures.children.length) {
                var minFiredOfLined_1 = Math.max.apply(Math, this.firedLines);
                this.bottomFigures.children.forEach(function (block) {
                    var _block = (new Tile_1.Tile).fromDOC(block);
                    if (_block.figure.getBounds().y <= minFiredOfLined_1)
                        _block.setPosition(_block.coords.x, _block.coords.y + _this.firedLines.length);
                });
            }
        };
        function gameOver() {
            return this.bottomFigures.getBounds().y < 0;
        }
        function animate() {
            if (gameOver.call(this) && confirm('Gameover! Are you want to replay?'))
                return location.reload();
            activeFigureMoving.call(this);
            renderer.render(stage);
            requestAnimationFrame(animate.bind(this));
        }
        requestAnimationFrame(animate.bind(this));
    }
    Game.prototype.bindEvents = function () {
        Common_1.Common.bind(window, 'keyup', this.onKeyUp.bind(this));
        Common_1.Common.bind(window, 'keydown', this.onKeyDown.bind(this));
    };
    Game.prototype.onKeyUp = function () {
        this.userMoving = false;
    };
    Game.prototype.onKeyDown = function (event) {
        this.userMoving = true;
        var self = this;
        switch (event.keyCode) {
            case 37:
                this.activeFigure.moveLeft(function () {
                    var aF = this, existLeft = false;
                    self.bottomFigures.children.forEach(function (block) {
                        if (existLeft)
                            return false;
                        var _block = (new Tile_1.Tile).fromDOC(block);
                        if (~~_block.coords.y == ~~aF.coords.y
                            && ~~_block.coords.x == ~~aF.coords.x - aF.centerCoords.cx - 1)
                            existLeft = true;
                    });
                    return existLeft;
                });
                break;
            case 38:
                this.activeFigure.rotate(90);
                this.figureRotated = true;
                break;
            case 39:
                this.activeFigure.moveRight(function () {
                    var aF = this, existRight = false;
                    self.bottomFigures.children.forEach(function (block) {
                        if (existRight)
                            return false;
                        var _block = (new Tile_1.Tile).fromDOC(block);
                        if (~~_block.coords.y == ~~aF.coords.y
                            && ~~_block.coords.x == ~~aF.coords.x - aF.centerCoords.cx + aF.width)
                            existRight = true;
                    });
                    return existRight;
                });
                break;
            case 40:
                this.step = Math.pow(2, this.speed + 1) / Common_1.Common.blocks_data.height;
                break;
        }
    };
    Game.prototype.burnLine = function () {
        var _this = this;
        var bottomFigureBounds = this.bottomFigures.getBounds(), blockToBurn = [], firedLines = [];
        var _y = 0;
        if (bottomFigureBounds.width >= this.containerWidth - this.rightBarWidth) {
            for (_y = bottomFigureBounds.y; _y < bottomFigureBounds.y + bottomFigureBounds.height; _y += 16) {
                this.bottomFigures.children.forEach(function (block) {
                    if (block.getBounds().y == _y)
                        blockToBurn.push(block);
                });
                if (blockToBurn.length == this.maxBlockByX) {
                    firedLines.push(_y);
                    blockToBurn.forEach(function (block) {
                        _this.bottomFigures.removeChild(block);
                    });
                }
                blockToBurn = [];
            }
        }
        return firedLines;
    };
    return Game;
}());
exports.Game = Game;


/***/ }),

/***/ "./src/Main.ts":
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
var stage = new PIXI.Stage(0xAAAAAA); //Create PIXI Stage
var renderer = PIXI.autoDetectRenderer(388, 292); // Create PIXI Renderer
document.getElementById('game').appendChild(renderer.view); // Append view to game div
new Game_1.Game(stage, renderer, 300, 300, 1); // Creating an instance of Game


/***/ }),

/***/ "./src/Tetrominos.ts":
/*!***************************!*\
  !*** ./src/Tetrominos.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = __webpack_require__(/*! ./Common */ "./src/Common.ts");
var Tile_1 = __webpack_require__(/*! ./Tile */ "./src/Tile.ts");
/**
 * Creates a Tetrominos
 */
exports.Tetrominos = function (parentContainer, type, color) {
    //type = 'T-type';
    //color = Common.blocks_data.blocks.block_yellow;
    this.figure = new PIXI.DisplayObjectContainer();
    this.blocks = [];
    this.height = this.figure.height;
    this.width = this.figure.width;
    this.angle = 0;
    this.centerCoords = { rcx: 0, rcy: 0, cx: 0, cy: 0 };
    var self = this, texture;
    // Defines a Tetromonos
    var typesCreateFn = {
        'line type': function () {
            createFigureByMatrix([
                [1, 1, 1, 1]
            ]);
        },
        'block type': function () {
            createFigureByMatrix([
                [1, 1],
                [1, 1]
            ]);
        },
        '7-type': function () {
            createFigureByMatrix([
                [1, 1],
                [0, 1],
                [0, 1]
            ]);
        },
        'reverse 7-type': function () {
            createFigureByMatrix([
                [1, 1],
                [1, 0],
                [1, 0]
            ]);
        },
        'T-type': function () {
            createFigureByMatrix([
                [1, 1, 1],
                [0, 1, 0]
            ]);
        },
        'flash-type': function () {
            createFigureByMatrix([
                [1, 0],
                [1, 1],
                [0, 1]
            ]);
        },
        'reverse flash-type': function () {
            createFigureByMatrix([
                [0, 1],
                [1, 1],
                [1, 0]
            ]);
        }
    };
    this.figureType = type ? type : getRandomFigureType();
    this.figureColor = color ? color : getRandomBlock();
    texture = PIXI.Texture.fromImage(this.figureColor);
    typesCreateFn[this.figureType].call(this);
    this.addToContainer(parentContainer);
    function getRandomBlock() {
        var keys = Object.keys(Common_1.Common.blocks_data.blocks), rnd = ~~(Math.random() * keys.length), selected = keys[rnd];
        return Common_1.Common.blocks_data.blocks[selected];
    }
    function getRandomFigureType() {
        var keys = Object.keys(typesCreateFn), rnd = ~~(Math.random() * keys.length);
        return keys[rnd];
    }
    function createFigureByMatrix(matrix) {
        self.centerCoords.cx = ~~(matrix[0].length / 2);
        self.centerCoords.cy = ~~(matrix.length / 2);
        matrix.forEach(function (vector, Y) {
            vector.forEach(function (item, X) {
                if (item === 0)
                    return;
                var block = new Tile_1.Tile(function () {
                    return new PIXI.Sprite(texture);
                });
                //block.setPosition(X, Y);
                block.setPosition(X - self.centerCoords.cx, Y - self.centerCoords.cy);
                block.addToContainer(self.figure);
                self.blocks.push(block);
            });
        });
        self.height = matrix.length;
        self.width = matrix[0].length;
    }
};
exports.Tetrominos.prototype = new Tile_1.Tile;
/**
 * Removes from current container and moves to a new container
 */
exports.Tetrominos.prototype.moveToContainer = function (newContainer) {
    this.remove();
    return new exports.Tetrominos(newContainer, this.figureType, this.figureColor);
};
/**
 * Sets the position
 */
exports.Tetrominos.prototype.setPosition = function (x, y) {
    var _pos = Tile_1.Tile.prototype.setPosition.call(this, x, y);
    this.centerCoords.rcx = _pos.x / Common_1.Common.blocks_data.width;
    this.centerCoords.rcy = _pos.y / Common_1.Common.blocks_data.height;
};
exports.Tetrominos.prototype.getCoords = function () {
    return {
        X1: this.centerCoords.rcx - this.centerCoords.cx,
        X2: this.centerCoords.rcx - this.centerCoords.cx + this.width,
        Y1: this.centerCoords.rcy - this.centerCoords.cy,
        Y2: this.centerCoords.rcy - this.centerCoords.cy + this.height
    };
};
/**
 * Rotates the Tetromios
 * When figure turned then real coordinates of center (rcx, rcy) stay unchanged
 */
exports.Tetrominos.prototype.rotate = function (angle) {
    var _h = this.height, _w = this.width, maxX = this.figure.parent.getBounds().width / Common_1.Common.blocks_data.height;
    this.height = _w;
    this.width = _h;
    this.angle += angle;
    this.figure.rotation += (angle / 90) * Math.PI / 2;
    if (this.width != this.height) {
        switch (this.angle % 360) {
            case 90:
                this.centerCoords.cx = Math.round(this.width / 2);
                this.centerCoords.cy = ~~(this.height / 2);
                break;
            case 180:
                this.centerCoords.cx = Math.round(this.width / 2);
                this.centerCoords.cy = Math.round(this.height / 2);
                break;
            case 270:
                this.centerCoords.cx = ~~(this.width / 2);
                this.centerCoords.cy = Math.round(this.height / 2);
                break;
            default:
                this.centerCoords.cx = ~~(this.width / 2);
                this.centerCoords.cy = ~~(this.height / 2);
        }
    }
    if (this.getCoords().X1 < 0)
        this.setPosition(this.centerCoords.cx, this.centerCoords.rcy);
    if (this.getCoords().X2 > maxX)
        this.setPosition(maxX - this.width + this.centerCoords.cx, this.centerCoords.rcy);
    return this.angle;
};
/**
 * Move the Tetrominos to left and returns the result
 */
exports.Tetrominos.prototype.moveLeft = function (checkFn) {
    var newX = this.centerCoords.rcx - 1, result = false;
    newX = newX < this.centerCoords.cx ? this.centerCoords.cx : newX;
    if (Common_1.Common.isUndefined(checkFn) || !checkFn.call(this))
        result = this.setPosition(newX, this.centerCoords.rcy);
    return result;
};
/**
 * Move the Tetrominos to right and returns the result
 */
exports.Tetrominos.prototype.moveRight = function (checkFn) {
    var newX = this.centerCoords.rcx + 1, maxX = this.figure.parent.getBounds().width / Common_1.Common.blocks_data.height - this.width + this.centerCoords.cx, result = false;
    newX = newX > maxX ? maxX : newX;
    if (Common_1.Common.isUndefined(checkFn) || !checkFn.call(this))
        result = this.setPosition(newX, this.centerCoords.rcy);
    return result;
};
/**
 * Detects the collision
 */
exports.Tetrominos.prototype.intersectWith = function (withFigure, d) {
    var intersect = false;
    if (withFigure.children.length) {
        this.figure.children.forEach(function (activeBlock) {
            if (intersect)
                return false;
            var x1 = Math.round(activeBlock.getBounds().x), y1 = Math.round(activeBlock.getBounds().y);
            withFigure.children.forEach(function (bottomBlock) {
                if (intersect)
                    return false;
                var x2 = Math.round(bottomBlock.getBounds().x), y2 = Math.round(bottomBlock.getBounds().y);
                if (x1 + Common_1.Common.blocks_data.width <= x2 || x2 + Common_1.Common.blocks_data.width <= x1
                    || y1 + Common_1.Common.blocks_data.height < y2 || y2 + Common_1.Common.blocks_data.height < y1)
                    intersect = false;
                else
                    intersect = true;
            });
        });
    }
    return intersect;
};


/***/ }),

/***/ "./src/Tile.ts":
/*!*********************!*\
  !*** ./src/Tile.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = __webpack_require__(/*! ./Common */ "./src/Common.ts");
/**
 * Handels the tile, building blocks for Tetrominos
 */
exports.Tile = function (createFn, parentContainer) {
    this.coords = { x: 0, y: 0 };
    if (!Common_1.Common.isUndefined(parentContainer))
        this.addToContainer(parentContainer);
    if (!Common_1.Common.isUndefined(createFn))
        this.figure = createFn.call(this);
};
/**
 * Returns a new tile with proper positions already appended
 */
exports.Tile.prototype.fromDOC = function (DOC) {
    var _x = DOC.getBounds().x / Common_1.Common.blocks_data.width, _y = DOC.getBounds().y / Common_1.Common.blocks_data.height;
    var newTile = new exports.Tile(function () {
        return DOC;
    });
    newTile.setPosition(_x, _y);
    return newTile;
};
/**
 * Sets the position for a tile
 * @returns Tile position
 */
exports.Tile.prototype.setPosition = function (x, y) {
    if (!Common_1.Common.isUndefined(x)) {
        if (typeof x == "object") {
            this.figure.position = {
                x: x.x * Common_1.Common.blocks_data.width,
                y: x.y * Common_1.Common.blocks_data.height
            };
            this.coords = x;
        }
        else {
            if (Common_1.Common.isUndefined(x, y))
                return false;
            this.coords = { x: x, y: y };
            this.figure.position = {
                x: x * Common_1.Common.blocks_data.width,
                y: y * Common_1.Common.blocks_data.height
            };
        }
    }
    return this.figure.position;
};
/**
 * Add tile to a given container
 * @param parentContainer DisplayObjectContainer where the tile will be appended
 */
exports.Tile.prototype.addToContainer = function (parentContainer) {
    if (Common_1.Common.isUndefined(parentContainer))
        return false;
    this.parentContainer = parentContainer;
    return this.parentContainer.addChild(this.figure);
};
/**
 * Moves the tile by setting it's position
 */
exports.Tile.prototype.moveDown = function (speed, checkFn) {
    if (!Common_1.Common.isUndefined(checkFn) && checkFn.call(this))
        return false;
    this.setPosition(this.coords.x, this.coords.y + speed);
    return true;
};
/**
 * Removes a tile from parent container
 */
exports.Tile.prototype.remove = function () {
    return this.parentContainer ? this.parentContainer.removeChild(this.figure) : false;
};
/**
 * Detects a tile collision with other tile
 */
exports.Tile.prototype.intersectWith = function (withFigure) {
    var self = this, intersect = false, x1 = this.figure.getBounds().x, y1 = this.figure.getBounds().y;
    if (withFigure.children.length)
        withFigure.children.forEach(function (bottomBlock) {
            if (intersect || self.figure == bottomBlock)
                return false;
            var x2 = bottomBlock.getBounds().x, y2 = bottomBlock.getBounds().y;
            if (x1 + Common_1.Common.blocks_data.width <= x2 || x2 + Common_1.Common.blocks_data.width <= x1
                || y1 + Common_1.Common.blocks_data.height < y2 || y2 + Common_1.Common.blocks_data.height < y1)
                intersect = false;
            else
                intersect = true;
        });
    return intersect;
};


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/Main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/Main.ts */"./src/Main.ts");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map