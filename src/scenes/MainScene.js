import Phaser from 'phaser';
import CST from "../cst.js";
import Tile from "../modules/Tile.js";
import Shop from "../modules/Shop.js";
import config from "../config.js";
import Barn from "../modules/Barn.js";
import Wallet from "../modules/Wallet.js";


class MainScene extends Phaser.Scene {
  constructor() {
    super(CST.SCENES.MAIN);
  }


  preload() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
  }


  create() {
    this.add.image(400, 300, 'farm'); // background

    this.wallet = new Wallet({ scene: this, money: config.startMoney });
    this.barn = this.add.existing(new Barn({ scene: this, x: this.width - 300, y: 96 }));
    this.shop = this.add.existing(new Shop({ scene: this, x: this.width - 300, y: 450 }));
    this.tiles = Tile.addTileGrid({ scene: this, offsetX: 64, offsetY: 96 });
  }


  update(time, delta) {
    const deltaTime = delta / 1000;

    this.tiles.children.iterate(tile => tile.entity && tile.entity.update(deltaTime));

    this.wallet.update();
    this.barn.update();
  }
}

export default MainScene;
