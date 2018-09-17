import { Common } from "./Common";
import { Tile } from "./Tile";

/**
 * Creates a Tetrominos
 */
export let Tetrominos = function (parentContainer, type?, color?) {
    //type = 'T-type';
    //color = Common.blocks_data.blocks.block_yellow;

    this.figure = new PIXI.DisplayObjectContainer();

    this.blocks = [];

    this.height = this.figure.height;
    this.width = this.figure.width;
    this.angle = 0;
    this.centerCoords = { rcx: 0, rcy: 0, cx: 0, cy: 0 };

    let self = this,
        texture;

    // Defines a Tetromonos
    let typesCreateFn = {
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
        let keys = Object.keys(Common.blocks_data.blocks),
            rnd = ~~(Math.random() * keys.length),
            selected = keys[rnd];

        return Common.blocks_data.blocks[selected];
    }

    function getRandomFigureType() {
        let keys = Object.keys(typesCreateFn),
            rnd = ~~(Math.random() * keys.length);

        return keys[rnd];
    }

    function createFigureByMatrix(matrix) {
        self.centerCoords.cx = ~~(matrix[0].length / 2);
        self.centerCoords.cy = ~~(matrix.length / 2);

        matrix.forEach(function (vector, Y) {
            vector.forEach(function (item, X) {
                if (item === 0)
                    return;

                let block = new Tile(function () {
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

Tetrominos.prototype = new Tile;

/**
 * Removes from current container and moves to a new container
 */
Tetrominos.prototype.moveToContainer = function (newContainer) {
    this.remove();
    return new Tetrominos(newContainer, this.figureType, this.figureColor);
};

/**
 * Sets the position
 */
Tetrominos.prototype.setPosition = function (x: number, y: number) {
    let _pos = Tile.prototype.setPosition.call(this, x, y);

    this.centerCoords.rcx = _pos.x / Common.blocks_data.width;
    this.centerCoords.rcy = _pos.y / Common.blocks_data.height;
};

Tetrominos.prototype.getCoords = function () {
    return {
        X1: this.centerCoords.rcx - this.centerCoords.cx,
        X2: this.centerCoords.rcx - this.centerCoords.cx + this.width,
        Y1: this.centerCoords.rcy - this.centerCoords.cy,
        Y2: this.centerCoords.rcy - this.centerCoords.cy + this.height
    }
};

/**
 * Rotates the Tetromios
 * When figure turned then real coordinates of center (rcx, rcy) stay unchanged
 */
Tetrominos.prototype.rotate = function (angle) {
    let _h = this.height,
        _w = this.width,
        maxX = this.figure.parent.getBounds().width / Common.blocks_data.height;

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
Tetrominos.prototype.moveLeft = function (checkFn) {
    let newX = this.centerCoords.rcx - 1,
        result = false;

    newX = newX < this.centerCoords.cx ? this.centerCoords.cx : newX;

    if (Common.isUndefined(checkFn) || !checkFn.call(this))
        result = this.setPosition(newX, this.centerCoords.rcy);

    return result;
};

/**
 * Move the Tetrominos to right and returns the result
 */
Tetrominos.prototype.moveRight = function (checkFn) {
    let newX = this.centerCoords.rcx + 1,
        maxX = this.figure.parent.getBounds().width / Common.blocks_data.height - this.width + this.centerCoords.cx,
        result = false;

    newX = newX > maxX ? maxX : newX;

    if (Common.isUndefined(checkFn) || !checkFn.call(this))
        result = this.setPosition(newX, this.centerCoords.rcy);

    return result;
};

/**
 * Detects the collision
 */
Tetrominos.prototype.intersectWith = function (withFigure, d) {
    let intersect = false;
    if (withFigure.children.length) {
        this.figure.children.forEach(function (activeBlock) {
            if (intersect)
                return false;

            let x1 = Math.round(activeBlock.getBounds().x),
                y1 = Math.round(activeBlock.getBounds().y);

            withFigure.children.forEach(function (bottomBlock) {
                if (intersect)
                    return false;

                let x2 = Math.round(bottomBlock.getBounds().x),
                    y2 = Math.round(bottomBlock.getBounds().y);

                if (x1 + Common.blocks_data.width <= x2 || x2 + Common.blocks_data.width <= x1
                    || y1 + Common.blocks_data.height < y2 || y2 + Common.blocks_data.height < y1)
                    intersect = false;
                else
                    intersect = true;
            });
        });
    }
    return intersect;
};