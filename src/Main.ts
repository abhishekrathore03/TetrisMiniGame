import { Game } from "./Game";

let stage: PIXI.Stage = new PIXI.Stage(0xAAAAAA); //Create PIXI Stage
let renderer: PIXI.PixiRenderer = PIXI.autoDetectRenderer(388, 292); // Create PIXI Renderer
document.getElementById('game').appendChild(renderer.view); // Append view to game div
new Game(stage, renderer, 300, 300, 1); // Creating an instance of Game