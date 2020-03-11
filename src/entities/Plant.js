import Phaser from 'phaser';
import Button from "../components/Button.js";
import config from "../config.js";


class Plant extends Phaser.GameObjects.Sprite {
  constructor({ scene, x, y, texture, frame, tile, entity }) {
    super(scene, x, y, texture, frame);

    this.tile = tile;
    this.entity = entity;

    this.progress = 0;
    this.progressTime = this.entity.progressTime;
  }

  update(deltaTime) {
    this.progress = this.progress + deltaTime * (100 / this.progressTime) > 100 ?
        100 :
        this.progress + deltaTime * (100 / this.progressTime);
  }

  toBarn() {
    this.scene.barn.put(this.entity.id, 1);
    this.destroyPopup();
    this.destroy();
    this.tile.entity = null;
  }

  collectProduct() {
    if (this.progress === 100) {
      this.progress = 0;
      this.scene.barn.put(this.entity.product, 1);

      this.destroyPopup();
      this.showPopup();
      this.tile.popup = this.popup;
    }
  }

  showPopup() {
    this.popup = new Phaser.GameObjects.Container(this.scene, this.x, this.y - this.displayHeight / this.scale / 2);

    let i = 0;

    const toBarnBtn = new Button({
      scene: this.scene,
      x: 0,
      y: -i * config.textLineHeight,
      text: 'to barn',
      style: {
        backgroundColor: '#ffd260'
      },
      clickCallBack: () => this.toBarn()
    });
    toBarnBtn.setOrigin(0.5, 1);
    this.popup.add(toBarnBtn);
    i++;


    if (this.progress === 100) {
      const collectBtn = new Button({
        scene: this.scene,
        x: 0,
        y: -i * config.textLineHeight,
        text: 'collect',
        style: {
          backgroundColor: '#ffd260'
        },
        clickCallBack: () => this.collectProduct()
      });
      collectBtn.setOrigin(0.5, 1);
      this.popup.add(collectBtn);
    }


    this.scene.add.existing(this.popup);
  }

  destroyPopup() {
    this.popup.destroy();
    this.popup = null;
  }
}

export default Plant;
