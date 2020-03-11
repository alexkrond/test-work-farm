import Phaser from 'phaser';
import MainScene from "./scenes/MainScene.js";
import LoadingScene from "./scenes/LoadingScene.js";


const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [LoadingScene, MainScene],
  dom: {
    createContainer: true
  },
  parent: document.querySelector('.container'),
  disableContextMenu: true,
};


const game = new Phaser.Game(config);
