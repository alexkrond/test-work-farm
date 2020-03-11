import Phaser from 'phaser';
import CST from "../cst.js";
import Tile from "../Tile.js";
import Shop from "../Shop.js";
import config from "../config.js";
import Barn from "../Barn.js";
import Wallet from "../Wallet.js";


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
    this.barn = this.add.existing(new Barn({ scene: this, x: this.width - 250, y: 50 }));
    this.tiles = Tile.addTileGrid({ scene: this, offsetX: 32, offsetY: 32 });
    this.shop = this.add.existing(new Shop({ scene: this, x: this.width - 250, y: 400 }));
  }


  update(time, delta) {
    const deltaTime = delta / 1000;

    // this.tiles.children.iterate(tile => {
    //   if (tile.entity && tile.entity.hasOwnProperty('update')) {
    //     tile.entity.update(deltaTime);
    //   }
    // });

    this.wallet.update();
    this.barn.update();
  }
}

export default MainScene;
