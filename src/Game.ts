import { Common } from "./Common";
import { Tile } from "./Tile";
import { Tetrominos } from "./Tetrominos";

export class Game {
    private speed: number = 0;
    private rightBarWidth: number = 0;
    private userMoving: boolean = false;
    private step: number;
    private initialStep: number;
    private maxBlockByX: number = 0;
    private maxBlockByY: number = 0;
    private stopMovingActiveFigure: boolean = false;
    private figureRotated: boolean = false;
    private containerWidth: number = 0;
    private previousFigure;
    private activeFigure;
    private self: Game;
    private bottomFigures;
    private activeFigureStartPosition = { x: 0, y: 0 };
    private nextFigureStartPosition = { x: 0, y: 0 };
    private firedLines;
    constructor(container: PIXI.Stage, renderer: PIXI.PixiRenderer, width: number, height: number, speed: number) {
        this.speed = speed > 4 ? 4 : speed;
        this.rightBarWidth = Common.blocks_data.width * 6;
        this.activeFigureStartPosition = { x: 0, y: 0 };
        this.nextFigureStartPosition = { x: 0, y: 0 };
        this.userMoving = false;
        this.step = Math.pow(2, speed) / (2 * Common.blocks_data.height);
        this.initialStep = this.step;
        this.stopMovingActiveFigure = false;
        this.figureRotated = false;
        this.self = this;
        this.bindEvents.call(this);

        this.containerWidth = (function (width) {
            let w = width,
                minWidth = Common.blocks_data.width * 5,
                minCountBlocks = ~~(minWidth / Common.blocks_data.width),
                realBlockHere = ~~(w / Common.blocks_data.width);

            realBlockHere = realBlockHere < minCountBlocks ? minCountBlocks : realBlockHere;

            return realBlockHere * Common.blocks_data.height;
        })(width) + this.rightBarWidth;

        let containerHeight = (function (height) {
            let h = height,
                minHeight = Common.blocks_data.height * 10,
                minCountBlocks = ~~(minHeight / Common.blocks_data.height),
                realBlockHere = ~~(h / Common.blocks_data.height);

            realBlockHere = realBlockHere < minCountBlocks ? minCountBlocks : realBlockHere;

            return realBlockHere * Common.blocks_data.height;
        })(height);


        this.maxBlockByX = (this.containerWidth - this.rightBarWidth) / Common.blocks_data.width;
        this.maxBlockByY = containerHeight / Common.blocks_data.height;

        let stage = container;

        let gameContainer = new PIXI.DisplayObjectContainer();
        gameContainer.position.x = 0;
        gameContainer.position.y = 0;

        let detailContainer = new PIXI.DisplayObjectContainer();
        detailContainer.position.x = this.containerWidth - this.rightBarWidth;
        detailContainer.position.y = 0;
        detailContainer.width = 200;

        stage.addChild(gameContainer);
        stage.addChild(detailContainer);

        let backgroundTexture = PIXI.Texture.fromImage(Common.blocks_data.background);

        for (let _i = 0; _i < this.maxBlockByX; _i++) {
            for (let _y = 0; _y < this.maxBlockByY; _y++) {
                let backgroundBlock = new Tile(function () {
                    return new PIXI.Sprite(backgroundTexture);
                });

                backgroundBlock.setPosition(_i, _y);
                backgroundBlock.addToContainer(gameContainer);
            }
        }

        this.bottomFigures = new PIXI.DisplayObjectContainer();

        gameContainer.addChild(this.bottomFigures);

        let activeFigureMoving = function () {
            if (this.userMoving)
                return;

            let self: Game = this;

            if (Common.isUndefined(this.activeFigure)) {

                if (!Common.isUndefined(this.previousFigure))
                    this.previousFigure.blocks.forEach((block) => {
                        block.addToContainer(this.bottomFigures);
                        block.figure.position.x = block.figure.getBounds().x;
                        block.figure.position.y = block.figure.getBounds().y;
                    });

                this.firedLines = this.burnLine.call(this); //burn only if created new figure, not every tick

                if (this.nextFigure)
                    this.activeFigure = this.nextFigure.moveToContainer(gameContainer);
                else
                    this.activeFigure = new Tetrominos(gameContainer);

                this.activeFigureStartPosition = {
                    x: ~~((this.containerWidth - this.rightBarWidth) / Common.blocks_data.width / 2),
                    y: -1
                };

                this.step = this.initialStep;
                this.activeFigure.setPosition(this.activeFigureStartPosition);
                this.stopMovingActiveFigure = false;

                //To show the next figure in right side
                this.nextFigure = new Tetrominos(detailContainer);
                this.nextFigureStartPosition = {
                    x: this.rightBarWidth / Common.blocks_data.width / 2,
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
                let bounds = this.figure.getBounds(),
                    stopBottom = (bounds.y + bounds.height >= containerHeight);

                return stopBottom || self.activeFigure.intersectWith(self.bottomFigures);
            })) {
                let rcx = this.activeFigure.centerCoords.rcx,
                    rcy = this.activeFigure.centerCoords.rcy,
                    fixDeltaX = rcx - rcx % ~~rcx,
                    fixDeltaY = rcy - rcy % ~~rcy;

                this.activeFigure.setPosition(fixDeltaX, fixDeltaY);

                this.previousFigure = this.activeFigure;

                delete this.activeFigure;
            }

            if (this.bottomFigures.children.length) {
                let minFiredOfLined = Math.max.apply(Math, this.firedLines);
                this.bottomFigures.children.forEach((block) => {
                    let _block = (new Tile).fromDOC(block);
                    if (_block.figure.getBounds().y <= minFiredOfLined)
                        _block.setPosition(_block.coords.x, _block.coords.y + this.firedLines.length);
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

    private bindEvents(): void {
        Common.bind(window, 'keyup', this.onKeyUp.bind(this));
        Common.bind(window, 'keydown', this.onKeyDown.bind(this));
    }

    private onKeyUp(): void {
        this.userMoving = false;
    }

    private onKeyDown(event?): void {
        this.userMoving = true;
        let self: Game = this;
        switch (event.keyCode) {
            case 37:
                this.activeFigure.moveLeft(function () {
                    let aF = this,
                        existLeft = false;

                    self.bottomFigures.children.forEach(function (block) {
                        if (existLeft)
                            return false;
                        let _block = (new Tile).fromDOC(block);
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
                    let aF = this,
                        existRight = false;

                    self.bottomFigures.children.forEach(function (block) {
                        if (existRight)
                            return false;
                        let _block = (new Tile).fromDOC(block);
                        if (~~_block.coords.y == ~~aF.coords.y
                            && ~~_block.coords.x == ~~aF.coords.x - aF.centerCoords.cx + aF.width)
                            existRight = true;
                    });

                    return existRight;
                });
                break;
            case 40:
                this.step = Math.pow(2, this.speed + 1) / Common.blocks_data.height;
                break;
        }

    }

    private burnLine() {
        let bottomFigureBounds = this.bottomFigures.getBounds(),
            blockToBurn = [],
            firedLines = [];

        let _y: number = 0;
        if (bottomFigureBounds.width >= this.containerWidth - this.rightBarWidth) {
            for (_y = bottomFigureBounds.y; _y < bottomFigureBounds.y + bottomFigureBounds.height; _y += 16) {
                this.bottomFigures.children.forEach((block) => {
                    if (block.getBounds().y == _y)
                        blockToBurn.push(block);
                });
                if (blockToBurn.length == this.maxBlockByX) {
                    firedLines.push(_y);
                    blockToBurn.forEach((block) => {
                        this.bottomFigures.removeChild(block);
                    });
                }
                blockToBurn = [];
            }
        }
        return firedLines;
    }
}