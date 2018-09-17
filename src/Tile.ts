import { Common } from "./Common";

/**
 * Handels the tile, building blocks for Tetrominos
 */
export let Tile = function (createFn?, parentContainer?) {
    this.coords = { x: 0, y: 0 };

    if (!Common.isUndefined(parentContainer))
        this.addToContainer(parentContainer);

    if (!Common.isUndefined(createFn))
        this.figure = createFn.call(this);
};

/**
 * Returns a new tile with proper positions already appended
 */
Tile.prototype.fromDOC = function (DOC) {
    let _x = DOC.getBounds().x / Common.blocks_data.width,
        _y = DOC.getBounds().y / Common.blocks_data.height;

    let newTile = new Tile(function () {
        return DOC;
    });

    newTile.setPosition(_x, _y);

    return newTile;
};

/**
 * Sets the position for a tile
 * @returns Tile position
 */
Tile.prototype.setPosition = function (x, y) {
    if (!Common.isUndefined(x)) {
        if (typeof x == "object") {
            this.figure.position = {
                x: x.x * Common.blocks_data.width,
                y: x.y * Common.blocks_data.height
            };
            this.coords = x;
        }
        else {
            if (Common.isUndefined(x, y))
                return false;

            this.coords = { x: x, y: y };

            this.figure.position = {
                x: x * Common.blocks_data.width,
                y: y * Common.blocks_data.height
            };
        }
    }

    return this.figure.position;
};

/**
 * Add tile to a given container 
 * @param parentContainer DisplayObjectContainer where the tile will be appended
 */
Tile.prototype.addToContainer = function (parentContainer) {
    if (Common.isUndefined(parentContainer))
        return false;

    this.parentContainer = parentContainer;
    return this.parentContainer.addChild(this.figure);
};

/**
 * Moves the tile by setting it's position
 */
Tile.prototype.moveDown = function (speed, checkFn) {
    if (!Common.isUndefined(checkFn) && checkFn.call(this))
        return false;

    this.setPosition(this.coords.x, this.coords.y + speed);

    return true;
};

/**
 * Removes a tile from parent container
 */
Tile.prototype.remove = function () {
    return this.parentContainer ? this.parentContainer.removeChild(this.figure) : false;
};

/**
 * Detects a tile collision with other tile
 */
Tile.prototype.intersectWith = function (withFigure) {
    let self = this,
        intersect = false,
        x1 = this.figure.getBounds().x,
        y1 = this.figure.getBounds().y;

    if (withFigure.children.length)
        withFigure.children.forEach(function (bottomBlock) {
            if (intersect || self.figure == bottomBlock)
                return false;

            let x2 = bottomBlock.getBounds().x,
                y2 = bottomBlock.getBounds().y;

            if (x1 + Common.blocks_data.width <= x2 || x2 + Common.blocks_data.width <= x1
                || y1 + Common.blocks_data.height < y2 || y2 + Common.blocks_data.height < y1)
                intersect = false;
            else
                intersect = true;
        });

    return intersect;
};